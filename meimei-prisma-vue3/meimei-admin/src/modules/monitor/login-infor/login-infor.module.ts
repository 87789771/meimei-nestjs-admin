/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 21:55:09
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 22:45:11
 * @FilePath: /meimei-new/src/modules/monitor/login-infor/login-infor.module.ts
 * @Description:
 *
 */
import { Global, Module } from '@nestjs/common';
import { LoginInforService } from './login-infor.service';
import { LoginInforController } from './login-infor.controller';

@Global()
@Module({
  providers: [LoginInforService],
  exports: [LoginInforService],
  controllers: [LoginInforController],
})
export class LoginInforModule {}
