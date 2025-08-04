/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-07-01 22:04:04
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2025-06-29 14:23:35
 * @FilePath: /goods-nest-admin/src/modules/monitor/job/job.processor.ts
 * @Description: 定时任务 队列 消费者
 *
 */
import { ModuleRef } from '@nestjs/core';
import { JOB_BULL_KEY } from 'src/common/contants/bull.contants';
import { ApiException } from 'src/common/exceptions/api.exception';
import { JobService } from './job.service';
import { SysJob } from '@prisma/client';
import { AddJobLogDto } from './dto/req-job.dto';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import dayjs from 'dayjs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject } from '@nestjs/common';
import { Logger } from 'winston';

@Processor(JOB_BULL_KEY)
export class JobConsumer extends WorkerHost {
  constructor(
    private jobService: JobService,
    private readonly moduleRef: ModuleRef,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super();
  }

  async process(job: Job<SysJob>) {
    try {
      const { serviceName, funName, argumens } = await this.jobService.analysisinvokeTarget(job.data);
      const service = await this.moduleRef.get(this.jobService.ico[serviceName], { strict: false });
      if (job.data.concurrent == '0') {
        try {
          // 允许并发。  如果允许并发将无法捕获任务错误，任务全部为成功。
          service[funName](...argumens);
        } catch (error) {
          await this.logger.info(
            `可并发任务执行失败了,任务id:${job.id},任务名称:${job.name},任务数据:${JSON.stringify(job.data)}`,
          );
        }
      } else if (job.data.concurrent == '1') {
        //禁止并发
        await service[funName](...argumens);
      }
    } catch (error) {
      throw error;
    }
  }

  @OnWorkerEvent('completed')
  /* 记录成功日志 */
  async onCompleted(job: Job<SysJob>) {
    const jobLog = new AddJobLogDto();
    const oneJob = job.data;
    jobLog.jobName = oneJob.jobName;
    jobLog.jobGroup = oneJob.jobGroup;
    jobLog.invokeTarget = oneJob.invokeTarget;
    jobLog.jobMessage = '执行成功';
    jobLog.status = '0';
    jobLog.createTime = dayjs().toISOString();
    await this.jobService.addJobLog(jobLog);
  }
  @OnWorkerEvent('failed')
  /* 记录失败日志 */
  async onFailed(job: Job<SysJob>, err: Error) {
    const jobLog = new AddJobLogDto();
    const oneJob = job.data;
    jobLog.jobName = oneJob.jobName;
    jobLog.jobGroup = oneJob.jobGroup;
    jobLog.invokeTarget = oneJob.invokeTarget;
    jobLog.jobMessage = '执行失败了';
    jobLog.exceptionInfo = err instanceof ApiException ? err.getResponse().toString() : err.message;
    jobLog.status = '1';
    jobLog.createTime = dayjs().toISOString();
    await this.jobService.addJobLog(jobLog);
  }
}
