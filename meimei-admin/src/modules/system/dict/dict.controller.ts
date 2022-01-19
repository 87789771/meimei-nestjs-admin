/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, StreamableFile, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DataObj } from 'src/common/class/data-obj.class';
import { ApiDataResponse, typeEnum } from 'src/common/decorators/api-data-response.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { Keep } from 'src/common/decorators/keep.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { DictService } from './dict.service';
import { ReqAddDictDataDto, ReqAddDictTypeDto, ReqDictDataListDto, ReqDictTypeListDto, ReqUpdateDictDataDto } from './dto/req-dict.dto';
import { DictData } from './entities/dict_data.entity';
import { DictType } from './entities/dict_type.entity';

@ApiTags('字典管理')
@ApiBearerAuth()
@Controller('system')
export class DictController {
    constructor(
        private readonly dictService: DictService,
        private readonly excelService: ExcelService
    ) { }

    /* 新增字典类型 */
    @RepeatSubmit()
    @Post('dict/type')
    @RequiresPermissions('system:dict:add')
    async addType(@Body() reqAddDictTypeDto: ReqAddDictTypeDto, @User(UserEnum.userName, UserInfoPipe) userName: string) {
        reqAddDictTypeDto.createBy = reqAddDictTypeDto.updateBy = userName
        await this.dictService.addOrUpdateType(reqAddDictTypeDto)
    }

    /* 分页查询字典类型列表 */
    @Get('dict/type/list')
    @RequiresPermissions('system:dict:query')
    @ApiPaginatedResponse(DictType)
    async typeList(@Query(PaginationPipe) reqDictTypeListDto: ReqDictTypeListDto): Promise<PaginatedDto<DictType>> {
        return this.dictService.typeList(reqDictTypeListDto)
    }

    /* 刷新缓存 */
    @Delete('dict/type/refreshCache')
    async refreshCache() {
        await this.dictService.refreshCache()
    }

    /* 删除字典类型 */
    @Delete('dict/type/:typeIds')
    @RequiresPermissions('system:dict:remove')
    async deleteDictType(@Param('typeIds') typeIds: string) {
        await this.dictService.deleteByDictIdArr(typeIds.split(','))
    }

    /* 通过 id 查询字典类型 */
    @Get('/dict/type/:typeId')
    @RequiresPermissions('system:dict:query')
    @ApiDataResponse(typeEnum.object, DictType)
    async oneDictType(@Param('typeId') typeId: number): Promise<DataObj<DictType>> {
        const dictType = await this.dictService.findDictTypeById(typeId)
        return DataObj.create(dictType)
    }

    /* 编辑字典类型 */
    @RepeatSubmit()
    @Put('dict/type')
    @RequiresPermissions('system:dict:edit')
    async updateDictType(@Body() dictType: DictType, @User(UserEnum.userName, UserInfoPipe) userName: string) {
        dictType.updateBy = userName
        await this.dictService.addOrUpdateType(dictType)
    }

    /* 通过字典类型查询字典数据 */
    @Get('dict/data/type/:dictType')
    async dictDataByDictType(@Param('dictType') dictType: string): Promise<DataObj<DictData[]>> {
        const dictDataArr = await this.dictService.getDictDataByDictType(dictType)
        return DataObj.create(dictDataArr)
    }

    /* 分页查询字典数据列表 */
    @Get('dict/data/list')
    @ApiPaginatedResponse(DictData)
    async dictDataList(@Query(PaginationPipe) reqDictDataListDto: ReqDictDataListDto) {
        return await this.dictService.dictDataList(reqDictDataListDto)
    }

    /* 新增字典数据 */
    @RepeatSubmit()
    @Post('dict/data')
    async addDictData(@Body() reqAddDictDataDto: ReqAddDictDataDto, @User(UserEnum.userName, UserInfoPipe) userName: string) {
        const dictData = await this.dictService.getDictDataByTypeOrValue(reqAddDictDataDto.dictType, reqAddDictDataDto.dictValue)
        if (dictData) throw new ApiException('该数据键值已存在，请更换')
        reqAddDictDataDto.createBy = reqAddDictDataDto.updateBy = userName
        await this.dictService.addOrUpdateDictData(reqAddDictDataDto)
    }

    /* 通过dictCode获取字典数据 */
    @Get('dict/data/:dictCode')
    @ApiDataResponse(typeEnum.object, ReqUpdateDictDataDto)
    async oneDictData(@Param('dictCode') dictCode: number) {
        const dictData = await this.dictService.findDictDataById(dictCode)
        return DataObj.create(dictData)
    }

    /* 编辑字典数据 */
    @RepeatSubmit()
    @Put('dict/data')
    async updateDictData(@Body() reqUpdateDictDataDto: ReqUpdateDictDataDto, @User(UserEnum.userName, UserInfoPipe) userName: string) {
        reqUpdateDictDataDto.updateBy = userName
        await this.dictService.addOrUpdateDictData(reqUpdateDictDataDto)
    }

    /* 删除字典数据 */
    @Delete('dict/data/:dictDatas')
    async deleteDictData(@Param('dictDatas') dictDatas: string) {
        await this.dictService.deleteDictDataByids(dictDatas.split(','))
    }

    /* 导出字典 */
    @RepeatSubmit()
    @Post('dict/type/export')
    @RequiresPermissions('system:dict:export')
    @Keep()
    @ApiPaginatedResponse(DictType)
    async export(@Body(PaginationPipe) reqDictTypeListDto: ReqDictTypeListDto) {
        const { rows } = await this.dictService.typeList(reqDictTypeListDto)
        const file = await this.excelService.export(DictType, rows)
        return new StreamableFile(file)
    }

    /* 导出字典 */
    @RepeatSubmit()
    @Post('dict/data/export')
    @Keep()
    @ApiPaginatedResponse(DictType)
    async exportData(@Body(PaginationPipe) reqDictDataListDto: ReqDictDataListDto) {
        const { rows } = await this.dictService.dictDataList(reqDictDataListDto)
        const file = await this.excelService.export(DictData, rows)
        return new StreamableFile(file)
    }
}

