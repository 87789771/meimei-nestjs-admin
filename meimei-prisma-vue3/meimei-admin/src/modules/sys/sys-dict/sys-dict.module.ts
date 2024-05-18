import { Module } from '@nestjs/common';
import { SysDictService } from './sys-dict.service';
import { SysDictController } from './sys-dict.controller';

@Module({
  providers: [SysDictService],
  controllers: [SysDictController],
  exports: [SysDictService],
})
export class SysDictModule {}
