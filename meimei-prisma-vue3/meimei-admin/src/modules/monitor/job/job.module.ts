/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-05-16 22:31:04
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-11-11 21:02:30
 * @FilePath: /meimei-admin/src/modules/monitor/job/job.module.ts
 * @Description:
 *
 */
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Module } from '@nestjs/common';
import { JOB_BULL_KEY } from 'src/common/contants/bull.contants';
import { JobConsumer } from './job.processor';
import { BullModule } from '@nestjs/bullmq';
import { ModuleRef } from '@nestjs/core';
@Module({
  imports: [
    /* 注册一个重复任务队列 */
    BullModule.registerQueue({
      name: JOB_BULL_KEY,
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 1000,
      },
    }),
  ],
  controllers: [JobController],
  /* JobConsumer必须异步注册，才能在队列执行前 对历史队列做处理 */
  providers: [
    JobService,
    {
      provide: JOB_BULL_KEY,
      useFactory: async (jobService, moduleRef) => {
        await jobService.initJob(); //按照数据库信息初始化队列
        return new JobConsumer(jobService, moduleRef);
      },
      inject: [JobService, ModuleRef],
    },
  ],
  exports: [JobService],
})
export class JobModule {}
