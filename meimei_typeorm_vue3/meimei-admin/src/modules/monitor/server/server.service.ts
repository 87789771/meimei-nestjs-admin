/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import * as systeminformation from 'systeminformation';
@Injectable()
export class ServerService {
  /* 获取cpu信息 */
  async getCpu() {
    const cup = await systeminformation.cpu();
    const currentLoad = await systeminformation.currentLoad();
    return {
      cpuNum: cup.cores,
      used: currentLoad.currentLoadUser.toFixed(2),
      sys: currentLoad.currentLoadSystem.toFixed(2),
      free: (
        100 -
        currentLoad.currentLoadUser -
        currentLoad.currentLoadSystem
      ).toFixed(2),
    };
  }

  /* 获取内存信息 */
  async getMem() {
    const mem = await systeminformation.mem();
    const total = (mem.total / (1024 * 1024 * 1024)).toFixed(2);
    const used = (mem.used / (1024 * 1024 * 1024)).toFixed(2);
    const free = (mem.free / (1024 * 1024 * 1024)).toFixed(2);
    const usage = (
      ((mem.used / (1024 * 1024 * 1024)) * 100) /
      (mem.total / (1024 * 1024 * 1024))
    ).toFixed(2);
    return {
      total,
      used,
      free,
      usage,
    };
  }

  /* 服务器信息 */
  async getSys() {
    const osInfo = await systeminformation.osInfo();
    const networkInterfaces = await systeminformation.networkInterfaces;
    const net = await networkInterfaces();
    return {
      computerName: osInfo.hostname,
      osName: osInfo.platform,
      computerIp: net[0].ip4,
      osArch: osInfo.arch,
    };
  }

  /* 获取磁盘状态 */
  async getSysFiles() {
    const fsSize = await systeminformation.fsSize;
    const disk = await fsSize();
    const sysFilesArr = disk.map((item) => {
      const dirName = item.fs;
      const sysTypeName = item.type;
      const typeName = item.mount;
      const total = (item.size / (1024 * 1024 * 1024)).toFixed(2);
      const free = (
        item.size / (1024 * 1024 * 1024) -
        item.used / (1024 * 1024 * 1024)
      ).toFixed(2);
      const used = (item.used / (1024 * 1024 * 1024)).toFixed(2);
      const usage = item.use.toFixed(2);
      return {
        dirName,
        sysTypeName,
        typeName,
        total,
        free,
        used,
        usage,
      };
    });
    return sysFilesArr;
  }
}
