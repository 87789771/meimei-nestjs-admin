import { Inject, Injectable } from '@nestjs/common';
import {
  AddDictDataDto,
  AddSysDictTypeDto,
  GetDictDataListDto,
  GetSysDictTypeDto,
  UpdateDictDataDto,
  UpdateSysDictTypeDto,
} from './dto/req-sys-dict.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ApiException } from 'src/common/exceptions/api.exception';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { ExtendedPrismaClient } from 'src/shared/prisma/prisma.extension';
import Redis from 'ioredis';
import { DICTTYPE_KEY } from 'src/common/contants/redis.contant';

@Injectable()
export class SysDictService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CustomPrisma')
    private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  /* 新增 */
  async addType(addSysDictTypeDto: AddSysDictTypeDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const config = await prisma.sysDictType.findUnique({
        where: {
          dictType: addSysDictTypeDto.dictType,
        },
      });
      if (config) throw new ApiException('字典类型已存在，请更换后再试。');
      return await prisma.sysDictType.create({
        data: addSysDictTypeDto,
      });
    });
  }

  /* 编辑字典类型 */
  async updateType(updateSysDictTypeDto: UpdateSysDictTypeDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { dictId, dictType } = updateSysDictTypeDto;
      const dict = await prisma.sysDictType.findUnique({
        where: {
          dictId,
        },
      });
      if (!dict) throw new ApiException('该记录不存在，请重新查询后操作。');
      const dict2 = await prisma.sysDictType.findFirst({
        where: {
          dictId: {
            not: dictId,
          },
          dictType,
        },
      });
      if (dict2) throw new ApiException('字典类型已存在，请更换后再试。');
      return await prisma.sysDictType.update({
        data: updateSysDictTypeDto,
        where: {
          dictId,
        },
      });
    });
  }

  /* 分页查询 */
  async typeList(getSysDictTypeDto: GetSysDictTypeDto) {
    const { dictName, dictType, status, params, skip, take } =
      getSysDictTypeDto;
    return await this.customPrisma.client.sysDictType.findAndCount({
      where: {
        dictName: {
          contains: dictName,
        },
        dictType: {
          contains: dictType,
        },
        status: status,
        createTime: {
          gte: params.beginTime,
          lt: params.endTime,
        },
      },
      skip: skip,
      take: take,
    });
  }

  /* 通过id查询字典类型 */
  async getDictTypeById(dictId: number) {
    return await this.prisma.sysDictType.findUnique({
      where: { dictId },
    });
  }

  /* 刷新字典缓存 */
  async refreshCache() {
    const keyArr = await this.redis.keys(`${DICTTYPE_KEY}:*`);
    if (keyArr && keyArr.length) {
      await this.redis.del(keyArr);
    }
  }

  /* 通过字典类型获取字典值 */
  async getDictDataByDictType(dictType: string) {
    const dictDataString = await this.redis.get(`${DICTTYPE_KEY}:${dictType}`);
    if (dictDataString) {
      return JSON.parse(dictDataString);
    }
    const dictData = await this.prisma.sysDictData.findMany({
      orderBy: {
        dictSort: 'asc',
      },
      where: {
        dictType,
      },
    });
    if (dictData.length) {
      this.redis.set(`${DICTTYPE_KEY}:${dictType}`, JSON.stringify(dictData));
    }
    return dictData;
  }

  /* 批量删除字典 */
  async deleteType(dictIdArr: number[]) {
    console.log(dictIdArr);

    await this.prisma.sysDictType.deleteMany({
      where: {
        dictId: {
          in: dictIdArr,
        },
      },
    });
  }

  /* 分页查询字典数据 */
  async dictDataList(getDictDataListDto: GetDictDataListDto) {
    const { dictType, dictLabel, skip, take, status } = getDictDataListDto;
    return await this.customPrisma.client.sysDictData.findAndCount({
      orderBy: {
        dictSort: 'asc',
      },
      where: {
        dictType,
        status,
        dictLabel: {
          contains: dictLabel,
        },
      },
      skip,
      take,
    });
  }

  /* 新增字典数据 */
  async addDictData(addDictDataDto: AddDictDataDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const dictData = await prisma.sysDictData.findFirst({
        where: {
          dictType: addDictDataDto.dictType,
          dictLabel: addDictDataDto.dictLabel,
        },
      });
      if (dictData) throw new ApiException('数据标签已存在，请更换后重试。');
      return await prisma.sysDictData.create({
        data: addDictDataDto,
      });
    });
  }

  /* 通过dictCode获取字典数据 */
  async findDictDataById(dictCode: number) {
    return await this.prisma.sysDictData.findUnique({
      where: {
        dictCode,
      },
    });
  }

  /* 编辑字典数据 */
  async updateDictData(updateDictDataDto: UpdateDictDataDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { dictCode, dictLabel, dictType } = updateDictDataDto;
      const dictData = prisma.sysDictData.findUnique({
        where: {
          dictCode,
        },
      });
      if (!dictData) throw new ApiException('该记录不存在，请重新查询后操作。');
      const dictData2 = await prisma.sysDictData.findFirst({
        where: {
          dictType,
          dictLabel,
          dictCode: {
            not: dictCode,
          },
        },
      });
      if (dictData2) throw new ApiException('数据标签已存在，请更换后再试。');
      return await prisma.sysDictData.update({
        data: updateDictDataDto,
        where: {
          dictCode,
        },
      });
    });
  }

  /* 删除字典数据 */
  async deleteDictData(dictCode: number[]) {
    await this.prisma.sysDictData.deleteMany({
      where: {
        dictCode: {
          in: dictCode,
        },
      },
    });
  }
}
