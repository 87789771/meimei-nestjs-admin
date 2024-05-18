/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-17 15:45:25
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 20:07:11
 * @FilePath: /meimei-new/src/modules/sys/sys-web/sys-web.service.ts
 * @Description:
 *
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { WEB_CONFIG_KEY } from 'src/common/contants/redis.contant';
import { AddSysWebDto } from './dto/req-sys-web.dto';

@Injectable()
export class SysWebService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async getOne(userId: number, usarName: string) {
    const webString = await this.redis.get(`${WEB_CONFIG_KEY}:${userId}`);
    if (webString) return JSON.parse(webString);
    const web = await this.prisma.sysWeb.findUnique({
      where: {
        createBy: usarName,
      },
    });
    if (web) {
      await this.redis.set(`${WEB_CONFIG_KEY}:${userId}`, JSON.stringify(web));
      return web;
    }
  }

  /* 新增或者编辑 */
  async add(userId: number, userName: string, addSysWebDto: AddSysWebDto) {
    await this.prisma.sysWeb.upsert({
      where: {
        createBy: userName,
      },
      update: addSysWebDto,
      create: addSysWebDto,
    });
    await this.redis.del(`${WEB_CONFIG_KEY}:${userId}`);
  }

  /* 重置配置 */
  async delete(userId: number, userName: string) {
    const web = await this.prisma.sysWeb.findUnique({
      where: {
        createBy: userName,
      },
    });
    if (web) {
      await this.prisma.sysWeb.delete({
        where: {
          createBy: userName,
        },
      });
      await this.redis.del(`${WEB_CONFIG_KEY}:${userId}`);
    }
  }
}
