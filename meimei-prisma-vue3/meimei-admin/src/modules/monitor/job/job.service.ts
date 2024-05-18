/*
https://docs.nestjs.com/providers#services
*/

import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CronRepeatOptions, Queue } from 'bull';
import { JOB_BULL_KEY } from 'src/common/contants/bull.contants';
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

@Injectable()
export class JobService {
  /* 所以需要任务调用的Sercice层，需要先在这里导入一下类 */
  ico = {
    [JobService.name]: JobService,
  };
  constructor(
    @InjectQueue(JOB_BULL_KEY) private jobQueue: Queue,
    private readonly moduleRef: ModuleRef,
    private readonly prisma: PrismaService,
    @Inject('CustomPrisma')
    private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async onModuleInit() {
    /* 模块加载好就初始化任务列表 */
    await this.initJob();
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
      await this.stop(job);
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
    return await this.prisma.sysJob.findUnique({
      where: {
        jobId,
      },
    });
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

  /* 初始化定时任务 */
  async initJob() {
    //停止所有的任务
    //getRepeatableJobs() 和 removeRepeatableByKey() 是 Bull 队列库中用于处理重复任务的两个方法。
    const jobObjArr = await this.jobQueue.getRepeatableJobs();
    await Promise.all(
      jobObjArr.map(
        async (item) => await this.jobQueue.removeRepeatableByKey(item.key),
      ),
    );
    await this.jobQueue.empty();

    //查找执行错误的任务,并且执行错误策略后，清空错误情况
    const failJobArr = await this.jobQueue.getFailed();
    await this.misfirePolicy(failJobArr.map((item) => item.data));
    await this.jobQueue.clean(0, 'failed'); //清空错误记录

    //查找需要执行的任务，并执行
    const reqJobListDto = new JobListDto();
    reqJobListDto.status = '0';
    const { rows } = await this.jobList(reqJobListDto);
    await Promise.all(rows.map((job) => this.start(job)));
  }

  /* 启动定时任务 */
  async start(job: SysJob) {
    const repeat: CronRepeatOptions = {
      cron: job.cronExpression,
    };
    await this.jobQueue.add(job, {
      jobId: job.jobId,
      removeOnComplete: true,
      removeOnFail: false, //出错记录
      repeat: repeat,
    });
  }

  /* 停止定时任务 */
  async stop(job: SysJob) {
    const jobObjArr = await this.jobQueue.getRepeatableJobs();
    const hasObj = jobObjArr.find((item) => item.id == job.jobId.toString());
    if (hasObj) {
      await this.jobQueue.removeRepeatableByKey(hasObj.key);
    }
  }

  /* 直接执行一次 */
  async once(job: SysJob) {
    await this.jobQueue.add(job, {
      jobId: job.jobId,
      removeOnComplete: true,
      removeOnFail: false, //出错记录
    });
  }

  /* 任务错误策略 */
  async misfirePolicy(jobArr: SysJob[]) {
    //查询所有数据库还在的并且还启用的任务
    const hasJobArr = await this.prisma.sysJob.findMany({
      where: {
        jobId: {
          in: jobArr.map((item) => Number(item.jobId)),
        },
        status: '0',
      },
    });
    // 立即执行的
    const immediately: SysJob[] = [];
    // 执行一次的
    const executeOnce: SysJob[] = [];
    hasJobArr.forEach((job) => {
      if (job.misfirePolicy == '1') {
        immediately.push(job);
      }
      if (
        job.misfirePolicy == '2' &&
        !executeOnce.find((job2) => job.jobId == job2.jobId)
      ) {
        executeOnce.push(job);
      }
    });
    await Promise.all(
      [...immediately, ...executeOnce].map(async (job) => await this.once(job)),
    );
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
    return new Promise((resolve, reject) => {
      //测试并发
      setTimeout(() => {
        resolve();
      }, 5 * 1000);
    });
  }
}
