/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-22 08:52:21
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-04-30 14:44:17
 * @FilePath: \meimei-new\src\app.module.ts
 * @Description:根模块
 *
 */
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';
import { SysModule } from './modules/sys/sys.module';
import { LoginModule } from './modules/login/login.module';
import { MonitorModule } from './modules/monitor/monitor.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [SharedModule, CommonModule, SysModule, LoginModule, MonitorModule],
  controllers: [AppController],
})
export class AppModule {}
