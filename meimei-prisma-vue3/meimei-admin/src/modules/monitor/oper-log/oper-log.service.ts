/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 21:55:32
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 16:13:31
 * @FilePath: \meimei-new\src\modules\monitor\oper-log\oper-log.service.ts
 * @Description: 接口访问日志
 *
 */
import { Inject, Injectable } from '@nestjs/common';
import { AddOperLogDto, GetOperLogListDto } from './dto/req-oper-log.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/shared/prisma/prisma.extension';

@Injectable()
export class OperLogService {
  constructor(private readonly prisma: PrismaService) {}
  @Inject('CustomPrisma')
  private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>;

  /* 新增 */
  async addOperLog(addOperLogDto: AddOperLogDto) {
    return await this.prisma.sysOperLog.create({ data: addOperLogDto });
  }

  /* 分页查询 */
  async list(getOperLogListDto: GetOperLogListDto) {
    const { skip, take, title, operName, businessType, status, params } =
      getOperLogListDto;
    return this.customPrisma.client.sysOperLog.findAndCount({
      orderBy: {
        operTime: 'desc',
      },
      where: {
        businessType,
        status,
        title: {
          contains: title,
        },
        operName: {
          contains: operName,
        },
        operTime: {
          gte: params.beginTime,
          lt: params.endTime,
        },
      },
      skip,
      take,
    });
  }

  /* 清空日志记录 */
  async cleanOperLog() {
    await this.prisma.sysOperLog.deleteMany({});
  }

  /* 清除日志 */
  async deleteOperLog(operLogIdArr: number[]) {
    await this.prisma.sysOperLog.deleteMany({
      where: {
        operId: {
          in: operLogIdArr,
        },
      },
    });
  }
}
