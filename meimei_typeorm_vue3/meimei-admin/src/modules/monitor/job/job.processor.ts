import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { ModuleRef } from '@nestjs/core';
import { Job } from 'bull';
import { JOB_BULL_KEY } from 'src/common/contants/bull.contants';
import { ApiException } from 'src/common/exceptions/api.exception';
import { Job as SysJob } from './entities/job.entity';
import { JobLog } from './entities/job_log.entity';
import { JobService } from './job.service';

@Processor(JOB_BULL_KEY)
export class JobConsumer {
  constructor(
    private jobService: JobService,
    private readonly moduleRef: ModuleRef,
  ) {}
  @Process()
  async handle(job: Job<SysJob>) {
    try {
      const { serviceName, funName, argumens } =
        await this.jobService.analysisinvokeTarget(job.data);
      const service = await this.moduleRef.get(serviceName, { strict: false });
      if (job.data.concurrent == '0') {
        // 允许并发。  如果允许并发将无法捕获任务错误，任务全部为成功。
        service[funName](...argumens);
      } else if (job.data.concurrent == '1') {
        //禁止并发
        await service[funName](...argumens);
      }
    } catch (error) {
      throw error;
    }
  }

  @OnQueueCompleted()
  /* 记录成功日志 */
  async onCompleted(job: Job<SysJob>) {
    const jobLog = new JobLog();
    const oneJob = job.data;
    jobLog.jobName = oneJob.jobName;
    jobLog.jobGroup = oneJob.jobGroup;
    jobLog.invokeTarget = oneJob.invokeTarget;
    jobLog.jobMessage = '执行成功';
    jobLog.status = '0';
    jobLog.createTime = new Date();
    await this.jobService.addJobLog(jobLog);
  }
  @OnQueueFailed()
  /* 记录失败日志 */
  async onFailed(job: Job<SysJob>, err: Error) {
    const jobLog = new JobLog();
    const oneJob = job.data;
    jobLog.jobName = oneJob.jobName;
    jobLog.jobGroup = oneJob.jobGroup;
    jobLog.invokeTarget = oneJob.invokeTarget;
    jobLog.jobMessage = '执行失败了';
    jobLog.exceptionInfo =
      err instanceof ApiException ? err.getResponse().toString() : err.message;
    jobLog.status = '1';
    jobLog.createTime = new Date();
    await this.jobService.addJobLog(jobLog);
  }
}
