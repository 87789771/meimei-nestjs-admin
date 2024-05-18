/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 21:55:09
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 14:54:53
 * @FilePath: \meimei-new\src\modules\monitor\oper-log\oper-log.module.ts
 * @Description:
 *
 */
import { Global, Module } from '@nestjs/common';
import { OperLogService } from './oper-log.service';
import { OperLogController } from './oper-log.controller';

@Global()
@Module({
  providers: [OperLogService],
  exports: [OperLogService],
  controllers: [OperLogController],
})
export class OperLogModule {}
