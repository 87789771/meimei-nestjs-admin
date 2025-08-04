/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-07-01 22:04:04
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2025-06-27 23:45:50
 * @FilePath: /goods-nest-admin/src/modules/monitor/job/job.service.ts
 * @Description: 定时任务
 *
 */

import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BULL_JOB, JOB_BULL_KEY } from 'src/common/contants/bull.contants';
import { ApiException } from 'src/common/exceptions/api.exception';
import {
  AddJobDto,
  AddJobLogDto,
  ChangStatusDto,
  JobListDto,
  JobLogListDto,
  JobRunDto,
  UpdateJobDto,
} from './dto/req-job.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/shared/prisma/prisma.extension';
import { SysJob } from '@prisma/client';
import { InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import * as parser from 'cron-parser';
import dayjs from 'dayjs';

@Injectable()
export class JobService {
  /* 所以需要任务调用的Sercice层，需要先在这里导入一下类 */
  ico = {
    [JobService.name]: JobService
  };
  constructor(
    @InjectQueue(JOB_BULL_KEY) private jobQueue: Queue,
    private readonly moduleRef: ModuleRef,
    private readonly prisma: PrismaService,
    @Inject('CustomPrisma')
    private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  /* 项目每次启动时初始化定时任务 */
  async initJob() {
    /* 查询所有延时任务， 先查询延时作业，在删除重复任务，否则查不到 */
    const delayedList = await this.jobQueue.getDelayed();    
    /* 查询所有重复作业 */
    const jobSchedulers = await this.jobQueue.getJobSchedulers();
    /* 删除所有重复作业 */
    await Promise.all(
      jobSchedulers.map((item) => this.jobQueue.removeJobScheduler(item.key)),
    );
    /* 查询数据库中所有启动的任务 */
    const sysJobList = await this.prisma.sysJob.findMany({
      where: {
        status: '0',
      },
    });
    /* 根据执行策略来决定宕机过程时未按时执行的任务该如何执行 */
    await Promise.all(
      delayedList.map(async (job: Job<SysJob>) => {
        const { opts, data } = job;
        const hasJob = sysJobList.find((item) => item.jobId === data.jobId);
        /* 如果该任务已经删除或者停止 就不触发执行策略了 */
        if (!hasJob) return;
        /* 执行策略是放弃执行 */
        if (hasJob.misfirePolicy === '3') return;
        const prevMillis = opts.prevMillis; //当时任务设定的执行时间
        //如果时间在此时之前,说明宕机期间存在未执行的任务
        if (dayjs(prevMillis).isBefore(dayjs())) {
          /* 执行策略是执行一次 */
          if (hasJob.misfirePolicy === '2') {
            await this.once(hasJob);
          }
          /* 执行策略是立即执行，所有未执行的重复任务都执行一遍 */
          if (hasJob.misfirePolicy === '1') {
            const pattern = opts.repeat?.pattern; //获取任务正则表达式
            if (pattern) {
              /* 解析正则表达， 从当时任务设定的执行时间开始解析, 此时此刻结束, 启动迭代模式 */
              let interval = parser.parseExpression(pattern, {
                currentDate: dayjs(prevMillis - 1).format(),
                endDate: dayjs().format(),
                iterator: true,
              });
              while (true) {
                try {
                  interval.next(); //如果不存在下一个迭代对象就会抛出错误
                  await this.once(hasJob);
                } catch (e) {
                  break;
                }
              }
            }
          }
        }
      }),
    );
    /* 重新启动重复任务 */
    await Promise.all(sysJobList.map((item) => this.start(item)));
  }

  /* 新增任务 */
  async addJob(addJobDto: AddJobDto) {
    await this.analysisinvokeTarget(addJobDto);
    const job = await this.prisma.sysJob.create({
      data: addJobDto,
    });
    if (job.status == '0') {
      await this.start(job);
    }
  }

  /* 编辑任务 */
  async updataJob(updateJobDto: UpdateJobDto) {
    await this.analysisinvokeTarget(updateJobDto);
    const job = await this.prisma.sysJob.update({
      where: {
        jobId: updateJobDto.jobId,
      },
      data: updateJobDto,
    });
    if (job.status == '0') {
      await this.start(job);
    } else {
      await this.stop(job);
    }
  }

  /* 分页查询任务列表 */
  async jobList(jobListDto: JobListDto) {
    const { jobName, jobGroup, status } = jobListDto;
    return await this.customPrisma.client.sysJob.findAndCount({
      where: {
        jobName: {
          contains: jobName,
        },
        jobGroup,
        status,
      },
    });
  }

  /* 通过id查询任务 */
  async oneJob(jobId: number) {
    const job = await this.prisma.sysJob.findUnique({
      where: {
        jobId,
      },
    });
    let nextValidTime = '';
    if (job.cronExpression) {
      try {
        let interval = parser.parseExpression(job.cronExpression);
        nextValidTime = dayjs(interval.next().toString()).format();
      } catch (error) {}
    }
    return {
      ...job,
      nextValidTime,
    };
  }

  /* 执行一次 */
  async runOne(jobRunDto: JobRunDto) {
    const job = await this.prisma.sysJob.findUnique({
      where: jobRunDto,
    });
    if (job) {
      await this.once(job);
    }
  }

  /* 删除任务 */
  async deleteJob(jobIds: number[]) {
    return await this.prisma.$transaction(async (prisma) => {
      const jobList = await prisma.sysJob.findMany({
        where: {
          jobId: {
            in: jobIds,
          },
        },
      });
      const promiseArr = jobList.map((job) => this.stop(job));
      await Promise.all(promiseArr);
      await await this.prisma.sysJob.deleteMany({
        where: {
          jobId: {
            in: jobIds,
          },
        },
      });
    });
  }

  /* 更改任务状态 */
  async changeStatus(changStatusDto: ChangStatusDto) {
    const { jobId, status } = changStatusDto;
    const job = await this.prisma.sysJob.update({
      where: {
        jobId,
      },
      data: {
        status,
      },
    });
    if (job.status === '0') {
      await this.start(job);
    } else {
      await this.stop(job);
    }
  }

  /* 添加任务日志记录 */
  async addJobLog(addJobLogDto: AddJobLogDto) {
    return await this.prisma.sysJobLog.create({
      data: addJobLogDto,
    });
  }

  /* 分页查询任务调度日志 */
  async jobLogList(jobLogListDto: JobLogListDto) {
    const { skip, take, jobName, jobGroup, status, params } = jobLogListDto;
    return this.customPrisma.client.sysJobLog.findAndCount({
      where: {
        jobName: {
          contains: jobName,
        },
        jobGroup,
        status,
        createTime: {
          gte: params.beginTime,
          lt: params.endTime,
        },
      },
      skip,
      take,
    });
  }

  /* 删除任务日志 */
  async deleteJogLog(jobLogIds: number[]) {
    return await this.prisma.sysJobLog.deleteMany({
      where: {
        jobLogId: {
          in: jobLogIds,
        },
      },
    });
  }

  /* 清空调度日志 */
  async cleanJobLog() {
    return await this.prisma.sysJobLog.deleteMany({});
  }

  /* 启动一个重复任务 */
  async start(job: SysJob) {
    //先尝试删除这个任务
    await this.jobQueue.removeJobScheduler(`${BULL_JOB}_${job.jobId}`);
    await this.jobQueue.upsertJobScheduler(
      `${BULL_JOB}_${job.jobId}`,
      { pattern: job.cronExpression },
      {
        data: job,
      },
    );
  }

  /* 删除重复任务 */
  async stop(job: SysJob) {
    await this.jobQueue.removeJobScheduler(`${BULL_JOB}_${job.jobId}`);
  }

  /* 直接执行一次 */
  async once(job: SysJob) {
    await this.jobQueue.add(`${BULL_JOB}_${job.jobId}`, job, {
      lifo: true, //后进先出
    });
  }

  /* 解析类和方法和参数  "A.cc(22,true,'0')" */
  async analysisinvokeTarget(job: AddJobDto) {
    const invokeTarget = job.invokeTarget;
    const splitArr = invokeTarget.split('.');
    if (splitArr.length != 2) throw new ApiException('调用方法格式错误');
    const serviceName = splitArr[0];
    if (!(splitArr[1].includes('(') && splitArr[1].includes(')')))
      throw new ApiException('调用方法格式错误');
    const funName = splitArr[1].match(/(\S*)\(/)[1];
    if (!funName) throw new ApiException('调用方法格式错误');
    const argumens = eval('[' + splitArr[1].match(/\((\S*)\)/)[1] + ']');
    let service: any;
    try {
      service = await this.moduleRef.get(this.ico[serviceName], {
        strict: false,
      });
      if (!service || !(funName in service)) {
        throw new ApiException('调用方法未找到');
      }
    } catch (error) {
      throw new ApiException('调用方法未找到');
    }
    return {
      serviceName,
      funName,
      argumens,
    };
  }

  /* 测试定时任务的方法 */
  async demo(a, b, c, d): Promise<void> {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log('测试队列任务调用了');
    console.log('该方法会执行5秒');
    // throw new ApiException('错误了')
    console.log(new Date());
  }
}
