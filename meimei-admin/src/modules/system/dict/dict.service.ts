/*
https://docs.nestjs.com/providers#services
*/

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { Between, FindConditions, Like, Not, Repository } from 'typeorm';
import { DICTTYPE_KEY } from './dict.contant';
import { ReqAddDictDataDto, ReqAddDictTypeDto, ReqDictDataListDto, ReqDictTypeListDto, ReqUpdateDictDataDto } from './dto/req-dict.dto';
import { DictData } from './entities/dict_data.entity';
import { DictType } from './entities/dict_type.entity';

@Injectable()
export class DictService {
    constructor(
        @InjectRepository(DictType) private readonly dictTypeRepository: Repository<DictType>,
        @InjectRepository(DictData) private readonly dictDataRepository: Repository<DictData>,
        @InjectRedis() private readonly redis: Redis
    ) { }
    /* 新增或者编辑字典类型 */
    async addOrUpdateType(reqAddDictTypeDto: ReqAddDictTypeDto) {
        const dictType = await this.findByDictType(reqAddDictTypeDto.dictType, (reqAddDictTypeDto as DictType).dictId)
        if (dictType) throw new ApiException('该字典类型已存在，请更换')
        await this.dictTypeRepository.save(reqAddDictTypeDto)
    }

    /* 字典类型list */
    async typeList(reqDictTypeListDto: ReqDictTypeListDto) {
        let where: FindConditions<DictType> = {}
        if (reqDictTypeListDto.dictName) {
            where.dictName = Like(`%${reqDictTypeListDto.dictName}%`)
        }
        if (reqDictTypeListDto.dictType) {
            where.dictType = Like(`%${reqDictTypeListDto.dictType}%`)
        }
        if (reqDictTypeListDto.status) {
            where.status = reqDictTypeListDto.status
        }
        if (reqDictTypeListDto.params) {
            where.createTime = Between(reqDictTypeListDto.params.beginTime, moment(reqDictTypeListDto.params.endTime).add(1, 'day').format())
        }
        const result = await this.dictTypeRepository.findAndCount({
            where,
            order: { createTime: 1 },
            skip: reqDictTypeListDto.skip,
            take: reqDictTypeListDto.take
        })
        return {
            rows: result[0],
            total: result[1]
        }
    }

    /* 通过字典类型查询 */
    async findByDictType(dictType: string, dictId?: number): Promise<DictType> {
        let where: FindConditions<DictType> = {
            dictType
        }
        if (dictId) {
            where.dictId = Not(dictId)
        }
        return this.dictTypeRepository.findOne({
            where
        })
    }

    /* 通过字典id数组删除 */
    async deleteByDictIdArr(dictIdArr: string[] | number[]) {
        await this.dictTypeRepository.delete(dictIdArr)
    }

    /* 通过id 查找字典类型 */
    async findDictTypeById(typeIds: number) {
        return await this.dictTypeRepository.findOne(typeIds)
    }

    /* 通过 dictType 获取 字典数据(排除停用的) 并缓存进入redis*/
    async getDictDataByDictType(dictType: string): Promise<DictData[]> {
        const dictDataArrString = await this.redis.get(`${DICTTYPE_KEY}:${dictType}`)
        if (dictDataArrString) {
            return JSON.parse(dictDataArrString)
        } else {
            const dictDataArr = await this.dictDataRepository.createQueryBuilder('dictData')
                .innerJoin('dictData.dictType', 'dictType', "dictType.status = 0 and dictType.dictType = :dictType", { dictType })
                .where("dictData.status = 0")
                .getMany()
            await this.redis.set(`${DICTTYPE_KEY}:${dictType}`, JSON.stringify(dictDataArr))
            return dictDataArr
        }
    }

    /* 清除缓存 */
    async refreshCache() {
        const keyArr = await this.redis.keys(`${DICTTYPE_KEY}:*`)
        if (keyArr && keyArr.length) {
            await this.redis.del(keyArr)
        }
    }

    /* 分页查询字典数据 */
    async dictDataList(reqDictDataListDto: ReqDictDataListDto): Promise<PaginatedDto<DictData>> {
        let where: FindConditions<DictData> = {}
        if (reqDictDataListDto.status) {
            where.status = reqDictDataListDto.status
        }
        if (reqDictDataListDto.dictLabel) {
            where.dictLabel = Like(`%${reqDictDataListDto.dictLabel}%`)
        }
        const result = await this.dictDataRepository.createQueryBuilder('dictData')
            .innerJoin('dictData.dictType', 'dictType', "dictType.dictType = :dictType", { dictType: reqDictDataListDto.dictType })
            .where(where)
            .orderBy("dictData.dictSort", "ASC")
            .addOrderBy("dictData.createTime", "ASC")
            .skip(reqDictDataListDto.skip)
            .take(reqDictDataListDto.take)
            .getManyAndCount()
        return {
            rows: result[0],
            total: result[1]
        }
    }

    /* 新增或者编辑字典数据 */
    async addOrUpdateDictData(reqAddDictDataDto: ReqAddDictDataDto) {
        const oneDictData = await this.getDictDataByTypeOrValue(reqAddDictDataDto.dictType, reqAddDictDataDto.dictValue, (reqAddDictDataDto as any).dictCode)
        if (oneDictData) throw new ApiException('该数据键值已存在，请更换')
        const dictType = await this.findByDictType(reqAddDictDataDto.dictType)
        let dictData = Object.assign(new DictData(), reqAddDictDataDto) as DictData
        dictData.dictType = dictType
        return this.dictDataRepository.save(dictData)
    }

    /* 通过dictCode获取字典数据 */
    async findDictDataById(dictCode: number) {
        const dictData = await this.dictDataRepository.findOne(dictCode, { relations: ['dictType'] })
        const reqUpdateDictDataDto = Object.assign(new ReqUpdateDictDataDto(), dictData) as ReqUpdateDictDataDto
        reqUpdateDictDataDto.dictType = dictData.dictType.dictType
        return reqUpdateDictDataDto
    }

    /* 删除字典数据 */
    async deleteDictDataByids(dictDataArr: number[] | string[]) {
        return await this.dictDataRepository.delete(dictDataArr)
    }

    /* 通过字典类型和数据键值查询数据 */
    async getDictDataByTypeOrValue(dictType: string, dictValue: string, dictCode?: number): Promise<DictData> {
        const queryBuilder = this.dictDataRepository.createQueryBuilder('dictData')
            .innerJoin('dictData.dictType', 'dictType', "dictType.dictType = :dictType", { dictType })
            .where({ dictValue })
        if (dictCode) {
            queryBuilder.andWhere({
                dictCode: Not(dictCode)
            })
        }
        return await queryBuilder.getOne()
    }
}
