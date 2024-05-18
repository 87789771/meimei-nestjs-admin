/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-17 15:45:25
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 20:42:17
 * @FilePath: /meimei-new/src/modules/sys/sys-table/sys-table.service.ts
 * @Description:
 *
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { TABLE_CONFIG_KEY } from 'src/common/contants/redis.contant';
import { AddSysTableDto } from './dto/req-sys-table.dto';

@Injectable()
export class SysTableService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async getOne(userId: number, userName: string, tableId: string) {
    const tableJsonConfig = await this.redis.get(
      `${TABLE_CONFIG_KEY}:${tableId}:${userId}`,
    );
    if (tableJsonConfig) return tableJsonConfig;
    const table = await this.prisma.sysTable.findUnique({
      where: {
        tableId_createBy: {
          tableId,
          createBy: userName,
        },
      },
    });
    if (table) {
      const { tableJsonConfig } = table;
      await this.redis.set(
        `${TABLE_CONFIG_KEY}:${tableId}:${userId}`,
        tableJsonConfig,
      );
      return tableJsonConfig;
    }
  }

  /* 新增或者编辑 */
  async add(userId: number, userName: string, addSysTableDto: AddSysTableDto) {
    const { tableId } = addSysTableDto;
    await this.prisma.sysTable.upsert({
      where: {
        tableId_createBy: {
          tableId,
          createBy: userName,
        },
      },
      update: addSysTableDto,
      create: addSysTableDto,
    });
    await this.redis.del(`${TABLE_CONFIG_KEY}:${tableId}:${userId}`);
  }

  /* 重置配置 */
  async delete(userId: number, userName: string, tableId: string) {
    const table = await this.prisma.sysTable.findUnique({
      where: {
        tableId_createBy: {
          tableId,
          createBy: userName,
        },
      },
    });
    if (table) {
      await this.prisma.sysTable.delete({
        where: {
          tableId_createBy: {
            tableId,
            createBy: userName,
          },
        },
      });
      await this.redis.del(`${TABLE_CONFIG_KEY}:${tableId}:${userId}`);
    }
  }
}
