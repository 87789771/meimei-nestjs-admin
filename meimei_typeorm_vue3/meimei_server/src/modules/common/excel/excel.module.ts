import { ExcelService } from './excel.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DictModule } from 'src/modules/system/dict/dict.module';

@Module({
  imports: [DictModule],
  controllers: [],
  providers: [ExcelService],
  exports: [ExcelService],
})
export class ExcelModule {}
