/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-17 14:16:02
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 14:48:03
 * @FilePath: \meimei-new\src\modules\monitor\server\server.controller.ts
 * @Description:
 *
 */
import { Controller, Get } from '@nestjs/common';
import { DataObj } from 'src/common/class/data-obj.class';
import { ServerService } from './server.service';

@Controller('monitor')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  /* 获取监控数据 */
  @Get('server')
  async data() {
    const cpu = this.serverService.getCpu();
    const mem = this.serverService.getMem();
    const sys = this.serverService.getSys();
    const sysFiles = this.serverService.getSysFiles();
    const node = this.serverService.getNode();
    const promiseArr = await Promise.all([cpu, mem, sys, sysFiles, node]);
    const data = {
      cpu: promiseArr[0],
      mem: promiseArr[1],
      sys: promiseArr[2],
      sysFiles: promiseArr[3],
      node: promiseArr[4],
    };
    return DataObj.create(data);
  }
}
