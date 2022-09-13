import { LogService } from './log.service';
import { LogController } from './log.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logininfor } from './entities/logininfor.entity';
import { OperLog } from './entities/oper_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Logininfor, OperLog])],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
