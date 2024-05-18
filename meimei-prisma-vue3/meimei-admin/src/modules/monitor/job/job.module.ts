/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-05-16 22:31:04
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-16 22:39:53
 * @FilePath: /meimei-new/src/modules/monitor/job/job.module.ts
 * @Description: 
 * 
 */
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JOB_BULL_KEY } from 'src/common/contants/bull.contants';
import { JobConsumer } from './job.processor';
@Module({
  imports: [
    /* 注册一个定时任务队列 */
    BullModule.registerQueue({
      name: JOB_BULL_KEY,
    }),
  ],
  controllers: [JobController],
  providers: [JobService, JobConsumer],
  exports: [JobService, JobConsumer],
})
export class JobModule {}
