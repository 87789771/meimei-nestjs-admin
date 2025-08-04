/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-05-16 22:31:04
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2025-06-26 23:19:37
 * @FilePath: /goods-nest-admin/src/modules/monitor/job/job.module.ts
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
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { SharedModule } from 'src/shared/shared.module';

/**
 * 带重试机制的任务队列初始化函数
 * 解决数据库连接不稳定导致的启动失败问题
 */
async function initJobWithRetry(jobService: JobService, logger: Logger, maxRetries = 3): Promise<void> {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      await logger.info(`开始初始化定时任务队列...（第${retryCount + 1}次尝试）`);

      // 如果不是第一次尝试，等待一段时间让数据库连接更稳定
      if (retryCount > 0) {
        const waitTime = 1000 * (retryCount + 1); // 递增等待时间
        await logger.info(`等待${waitTime}ms后重试...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }

      // 执行任务队列初始化（处理未执行任务、重启必要的定时任务）
      await jobService.initJob();
      await logger.info('定时任务队列初始化成功');
      return; // 成功则退出
    } catch (error) {
      retryCount++;
      await logger.error(`定时任务队列初始化失败（第${retryCount}次尝试）`, {
        error: error.message,
        stack: error.stack,
        retryCount,
        maxRetries,
      });

      // 如果达到最大重试次数，抛出异常
      if (retryCount >= maxRetries) {
        await logger.error('定时任务队列初始化最终失败，已达到最大重试次数，应用启动将被阻止');
        throw new Error(`定时任务队列初始化失败，重试${maxRetries}次后仍然失败: ${error.message}`);
      }

      // 继续下一次重试
      await logger.warn(`将在短暂等待后进行第${retryCount + 1}次重试...`);
    }
  }
}

@Module({
  imports: [
    /* 导入共享模块，提供Winston日志服务 */
    SharedModule,
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
  /* JobConsumer必须异步注册，在BullMQ开始处理任务前先过滤未执行任务 */
  providers: [
    JobService,
    {
      provide: JOB_BULL_KEY,
      useFactory: async (jobService: JobService, moduleRef: ModuleRef, logger: Logger) => {
        // 在JobConsumer注册前必须先初始化任务队列
        // 这样BullMQ才能根据数据库状态正确处理未执行的任务
        // 使用重试机制提高启动成功率
        await initJobWithRetry(jobService, logger);
        return new JobConsumer(jobService, moduleRef, logger);
      },
      inject: [JobService, ModuleRef, WINSTON_MODULE_PROVIDER],
    },
  ],
  exports: [JobService],
})
export class JobModule {}
