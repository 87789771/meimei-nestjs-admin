import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Module } from '@nestjs/common';
import { Job } from './entities/job.entity';
import { JobLog } from './entities/job_log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { JOB_BULL_KEY } from 'src/common/contants/bull.contants';
import { JobConsumer } from './job.processor';
@Module({
  imports: [
    TypeOrmModule.forFeature([Job, JobLog]),
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
