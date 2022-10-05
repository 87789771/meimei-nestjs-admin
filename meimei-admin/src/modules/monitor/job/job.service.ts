/*
https://docs.nestjs.com/providers#services
*/

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { CronRepeatOptions, Queue } from 'bull';
import * as moment from 'moment';
import { JOB_BULL_KEY } from 'src/common/contants/bull.contants';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { Between, FindOptionsWhere, In, Like, Repository } from 'typeorm';
import {
  ReqAddJob,
  ReqChangStatusDto,
  ReqJobListDto,
  ReqJobLogList,
} from './dto/req-job.dto';
import { Job } from './entities/job.entity';
import { JobLog } from './entities/job_log.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobLog)
    private readonly jobLogRepository: Repository<JobLog>,
    @InjectQueue(JOB_BULL_KEY) private jobQueue: Queue,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    await this.initJob();
  }

  /* 新增任务 */
  async addJob(reqAddJob: ReqAddJob) {
    await this.analysisinvokeTarget(reqAddJob as Job);
    const job: Job = await this.jobRepository.save(reqAddJob);
    if (job.status == '0') {
      await this.start(job);
    }
  }

  /* 编辑任务 */
  async updataJob(job: Job) {
    await this.analysisinvokeTarget(job);
    job = await this.jobRepository.save(job);
    if (job.status == '0') {
      await this.stop(job);
      await this.start(job);
    } else {
      await this.stop(job);
    }
  }

  /* 分页查询任务列表 */
  async jobList(reqJobListDto: ReqJobListDto): Promise<PaginatedDto<Job>> {
    const where: FindOptionsWhere<Job> = {};
    if (reqJobListDto.jobName) {
      where.jobName = Like(`%${reqJobListDto.jobName}%`);
    }
    if (reqJobListDto.jobGroup) {
      where.jobGroup = reqJobListDto.jobGroup;
    }
    if (reqJobListDto.status) {
      where.status = reqJobListDto.status;
    }
    const result = await this.jobRepository.findAndCount({
      where,
      order: { createTime: 1 },
      skip: reqJobListDto.skip,
      take: reqJobListDto.take,
    });
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /* 通过id查询任务 */
  async oneJob(jobId: number): Promise<Job> {
    return this.jobRepository.findOneBy({ jobId });
  }

  /* 通过Id数组查询任务 */
  async findByIds(jobIdArr: number[]) {
    return await this.jobRepository.find({
      where: {
        jobId: In(jobIdArr),
      },
    });
  }

  /* 删除任务 */
  async deleteJob(jobIdArr: number[] | string[]) {
    return this.jobRepository.delete(jobIdArr);
  }

  /* 更改任务状态 */
  async changeStatus(reqChangStatusDto: ReqChangStatusDto, updateBy: string) {
    await this.jobRepository
      .createQueryBuilder('job')
      .update()
      .set({
        status: reqChangStatusDto.status,
        updateBy,
      })
      .where({ jobId: reqChangStatusDto.jobId })
      .execute();
    const job = await this.oneJob(reqChangStatusDto.jobId);
    if (job.status == '0') {
      await this.start(job);
    } else {
      await this.stop(job);
    }
  }

  /* 添加任务日志记录 */
  async addJobLog(jobLog: JobLog) {
    return await this.jobLogRepository.save(jobLog);
  }

  /* 分页查询任务调度日志 */
  async jobLogList(
    reqJobLogList: ReqJobLogList,
  ): Promise<PaginatedDto<JobLog>> {
    const where: FindOptionsWhere<JobLog> = {};
    if (reqJobLogList.jobName) {
      where.jobName = Like(`%${reqJobLogList.jobName}%`);
    }
    if (reqJobLogList.jobGroup) {
      where.jobGroup = reqJobLogList.jobGroup;
    }
    if (reqJobLogList.status) {
      where.status = reqJobLogList.status;
    }
    if (reqJobLogList.params) {
      where.createTime = Between(
        reqJobLogList.params.beginTime,
        moment(reqJobLogList.params.endTime).add(1, 'day').format(),
      );
    }
    const result = await this.jobLogRepository.findAndCount({
      where,
      order: { createTime: 1 },
      skip: reqJobLogList.skip,
      take: reqJobLogList.take,
    });
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /* 删除任务日志 */
  async deleteJogLog(jobLogIdArr: string[] | number[]) {
    return await this.jobLogRepository.delete(jobLogIdArr);
  }

  /* 清空调度日志 */
  async cleanJobLog() {
    return await this.jobLogRepository
      .createQueryBuilder('jobLog')
      .delete()
      .execute();
  }

  /* 初始化定时任务 */
  async initJob() {
    //停止所有的任务
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
    const reqJobListDto = new ReqJobListDto();
    reqJobListDto.status = '0';
    const { rows } = await this.jobList(reqJobListDto);
    await Promise.all(rows.map((job) => this.start(job)));
  }

  /* 启动定时任务 */
  async start(job: Job) {
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
  async stop(job: Job) {
    const jobObjArr = await this.jobQueue.getRepeatableJobs();
    const hasObj = jobObjArr.find((item) => item.id == job.jobId.toString());
    if (hasObj) {
      await this.jobQueue.removeRepeatableByKey(hasObj.key);
    }
  }

  /* 直接执行一次 */
  async once(job: Job) {
    await this.jobQueue.add(job, {
      jobId: job.jobId,
      removeOnComplete: true,
      removeOnFail: false, //出错记录
    });
  }

  /* 任务错误策略 */
  async misfirePolicy(jobArr: Job[]) {
    //查询所有数据库还在的任务
    jobArr = await this.findByIds(jobArr.map((item) => item.jobId));
    // 立即执行的
    const immediately: Job[] = [];
    // 执行一次的
    const executeOnce: Job[] = [];
    jobArr.forEach((job) => {
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
  async analysisinvokeTarget(job: Job) {
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
      service = await this.moduleRef.get(serviceName, { strict: false });
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
  async ceshi(a, b, c, d): Promise<void> {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log('试一试定时任务');
    // throw new ApiException('错误了')
    console.log(new Date());
    return new Promise((resolve, reject) => {
      //测试并发
      setTimeout(() => {
        resolve();
      }, 10 * 1000);
    });
  }
}
