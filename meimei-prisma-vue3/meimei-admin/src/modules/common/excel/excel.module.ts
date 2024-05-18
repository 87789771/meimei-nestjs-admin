import { SysDictModule } from 'src/modules/sys/sys-dict/sys-dict.module';
import { ExcelService } from './excel.service';
/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [SysDictModule],
  controllers: [],
  providers: [ExcelService],
  exports: [ExcelService],
})
export class ExcelModule {}
