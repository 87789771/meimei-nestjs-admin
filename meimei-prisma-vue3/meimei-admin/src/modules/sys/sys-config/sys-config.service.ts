/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-28 08:39:38
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-13 16:15:08
 * @FilePath: \meimei-new\src\modules\sys\sys-config\sys-config.service.ts
 * @Description: 接口日志
 *
 */
import { Inject, Injectable } from '@nestjs/common';
import {
  AddSysConfigDto,
  GetSysConfigListDto,
  UpdateSysConfigDto,
} from './dto/req-sys-config.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ApiException } from 'src/common/exceptions/api.exception';
import { ExtendedPrismaClient } from 'src/shared/prisma/prisma.extension';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { SYSCONFIG_KEY } from 'src/common/contants/redis.contant';

@Injectable()
export class SysConfigService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CustomPrisma')
    private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  /* 新增 */
  async add(addSysConfigDto: AddSysConfigDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const config = await prisma.sysConfig.findUnique({
        where: { configKey: addSysConfigDto.configKey },
      });
      if (config) throw new ApiException('参数键名已存在，请更换后再试。');
      return await prisma.sysConfig.create({ data: addSysConfigDto });
    });
  }

  /* 列表查询 */
  async list(getSysConfigListDto: GetSysConfigListDto) {
    const { configType, configName, configKey, params, skip, take } =
      getSysConfigListDto;
    return await this.customPrisma.client.sysConfig.findAndCount({
      where: {
        configType: configType,
        configName: {
          contains: configName,
        },
        configKey: {
          contains: configKey,
        },
        createTime: {
          gte: params.beginTime,
          lt: params.endTime,
        },
      },
      skip: skip,
      take: take,
    });
  }

  /* 清除缓存 */
  async refreshCache() {
    const keyArr = await this.redis.keys(`${SYSCONFIG_KEY}:*`);
    if (keyArr && keyArr.length) {
      return await this.redis.del(keyArr);
    }
  }

  /* 通过configKey查询 */
  async oneByconfigKey(configKey: string) {
    let configValue = await this.redis.get(`${SYSCONFIG_KEY}:${configKey}`);
    if (configValue) return configValue;
    const sysConfig = await this.prisma.sysConfig.findUnique({
      where: {
        configKey,
      },
    });
    configValue = sysConfig?.configValue;
    if (configValue) {
      this.redis.set(`${SYSCONFIG_KEY}:${configKey}`, configValue);
    }
    return configValue;
  }

  /* 通过id查询 */
  async findById(configId: number) {
    return await this.prisma.sysConfig.findUnique({
      where: { configId },
    });
  }

  /* 更新 */
  async update(updateSysConfigDto: UpdateSysConfigDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { configId, configKey } = updateSysConfigDto;
      const config = await prisma.sysConfig.findUnique({
        where: { configId },
      });
      if (!config) throw new ApiException('该记录不存在，请重新查询后操作。');
      const config2 = await prisma.sysConfig.findFirst({
        where: {
          configId: {
            not: configId,
          },
          configKey,
        },
      });
      if (config2) throw new ApiException('参数键名已存在，请更换后再试。');
      return await prisma.sysConfig.update({
        data: updateSysConfigDto,
        where: {
          configId,
        },
      });
    });
  }

  /* 删除 */
  async delete(configIdArr: number[]) {
    await this.prisma.sysConfig.deleteMany({
      where: {
        configId: {
          in: configIdArr,
        },
      },
    });
  }
}
