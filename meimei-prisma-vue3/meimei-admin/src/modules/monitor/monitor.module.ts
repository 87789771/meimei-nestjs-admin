/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 21:52:47
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 23:04:43
 * @FilePath: /meimei-new/src/modules/monitor/monitor.module.ts
 * @Description: 系统管理模块
 *
 */
import { Module } from '@nestjs/common';
import { OperLogModule } from './oper-log/oper-log.module';
import { LoginInforModule } from './login-infor/login-infor.module';
import { OnlineModule } from './online/online.module';
import { JobModule } from './job/job.module';
import { CacheModule } from './cache/cache.module';
import { ServerModule } from './server/server.module';

@Module({
  imports: [
    OperLogModule,
    LoginInforModule,
    OnlineModule,
    JobModule,
    CacheModule,
    ServerModule,
  ],
})
export class MonitorModule {}
