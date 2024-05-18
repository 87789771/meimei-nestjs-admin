/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-30 15:17:47
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 22:21:22
 * @FilePath: /meimei-new/src/modules/sys/sys-dict/sys-dict.controller.ts
 * @Description:
 *
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import {
  AddDictDataDto,
  AddSysDictTypeDto,
  GetDictDataListDto,
  GetSysDictTypeDto,
  UpdateDictDataDto,
  UpdateSysDictTypeDto,
} from './dto/req-sys-dict.dto';
import { CreateMessagePipe } from 'src/common/pipes/createmessage.pipe';
import { SysDictService } from './sys-dict.service';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { DataObj } from 'src/common/class/data-obj.class';
import { UpdateMessagePipe } from 'src/common/pipes/updatemessage.pipe';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { StringToArrPipe } from 'src/common/pipes/stringtoarr.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Keep } from 'src/common/decorators/keep.decorator';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ExportSysDictDto } from './dto/res-sys-dict.dto';

@Controller('system')
export class SysDictController {
  constructor(
    private readonly sysDictService: SysDictService,
    private readonly excelService: ExcelService,
  ) {}
  /* 新增字典类型 */
  @RepeatSubmit()
  @RequiresPermissions('system:dict:add')
  @Post('dict/type')
  @Log({ title: '字典管理', businessType: BusinessTypeEnum.insert })
  async addType(@Body(CreateMessagePipe) addSysDictTypeDto: AddSysDictTypeDto) {
    await this.sysDictService.addType(addSysDictTypeDto);
  }

  /* 编辑字典类型 */
  @Put('dict/type')
  @RepeatSubmit()
  @RequiresPermissions('system:dict:edit')
  @Log({ title: '字典管理', businessType: BusinessTypeEnum.update })
  async updateType(
    @Body(UpdateMessagePipe) updateSysDictTypeDto: UpdateSysDictTypeDto,
  ) {
    await this.sysDictService.updateType(updateSysDictTypeDto);
  }

  /* 分页查询字典类型列表 */
  @Get('dict/type/list')
  @RequiresPermissions('system:dict:query')
  async typeList(@Query(PaginationPipe) getSysDictTypeDto: GetSysDictTypeDto) {
    return await this.sysDictService.typeList(getSysDictTypeDto);
  }

  /* 刷新缓存 */
  @Delete('dict/type/refreshCache')
  @Log({
    title: '字典管理',
    businessType: BusinessTypeEnum.clean,
  })
  async refreshCache() {
    await this.sysDictService.refreshCache();
  }

  /* 通过ID查询字典类型 */
  @Get('/dict/type/optionselect')
  @RequiresPermissions('system:dict:query')
  async getOptionselect() {
    const getSysDictTypeDto = new GetSysDictTypeDto();
    const { rows } = await this.sysDictService.typeList(getSysDictTypeDto);
    return rows;
  }

  /* 通过ID查询字典类型 */
  @Get('/dict/type/:typeId')
  @RequiresPermissions('system:dict:query')
  async getDictTypeById(@Param('typeId') dictId: number) {
    const dictType = await this.sysDictService.getDictTypeById(dictId);
    return DataObj.create(dictType);
  }

  /* 删除字典类型 */
  @Delete('/dict/type/:dictIds')
  @Log({
    title: '字典管理',
    businessType: BusinessTypeEnum.delete,
  })
  async deleteType(
    @Param('dictIds', new StringToArrPipe()) dictIdArr: number[],
  ) {
    await this.sysDictService.deleteType(dictIdArr);
  }

  /* 导出字典类型 */
  @Post('dict/type/export')
  @RequiresPermissions('system:dict:export')
  @Keep()
  @Log({
    title: '字典管理',
    businessType: BusinessTypeEnum.export,
  })
  async export(@Body() getSysDictTypeDto: GetSysDictTypeDto) {
    const { rows } = await this.sysDictService.typeList(getSysDictTypeDto);
    const file = await this.excelService.export(ExportSysDictDto, rows);
    return new StreamableFile(file);
  }

  /* 通过字典类型查询字典数据 */
  @Get('dict/data/type/:dictType')
  async getDictDataByType(@Param('dictType') dictType: string) {
    const dictDataArr =
      await this.sysDictService.getDictDataByDictType(dictType);
    return DataObj.create(dictDataArr);
  }

  /* 分页查询字典数据列表 */
  @Get('dict/data/list')
  async dictDataList(
    @Query(PaginationPipe) getDictDataListDto: GetDictDataListDto,
  ) {
    return await this.sysDictService.dictDataList(getDictDataListDto);
  }

  /* 新增字典数据 */
  @Post('dict/data')
  @RepeatSubmit()
  @Log({
    title: '字典管理',
    businessType: BusinessTypeEnum.insert,
  })
  async addDictData(@Body(CreateMessagePipe) addDictDataDto: AddDictDataDto) {
    await this.sysDictService.addDictData(addDictDataDto);
  }

  /* 通过dictCode获取字典数据 */
  @Get('dict/data/:dictCode')
  async oneDictData(@Param('dictCode') dictCode: number) {
    const dictData = await this.sysDictService.findDictDataById(dictCode);
    return DataObj.create(dictData);
  }

  /* 编辑字典数据 */
  @RepeatSubmit()
  @Put('dict/data')
  async updateDictData(
    @Body(UpdateMessagePipe) updateDictDataDto: UpdateDictDataDto,
  ) {
    await this.sysDictService.updateDictData(updateDictDataDto);
  }

  /* 删除字典数据 */
  @Delete('dict/data/:dictCodes')
  @Log({
    title: '字典管理',
    businessType: BusinessTypeEnum.delete,
  })
  async deleteDictData(
    @Param('dictCodes', new StringToArrPipe()) dictCodeArr: number[],
  ) {
    await this.sysDictService.deleteDictData(dictCodeArr);
  }

  /* 导出字典数据 */
  @Post('dict/data/export')
  @RequiresPermissions('system:dict:export')
  @Keep()
  @Log({
    title: '字典管理',
    businessType: BusinessTypeEnum.export,
  })
  async exportData(@Body() getDictDataListDto: GetDictDataListDto) {
    const { rows } = await this.sysDictService.dictDataList(getDictDataListDto);
    const file = await this.excelService.export(AddDictDataDto, rows);
    return new StreamableFile(file);
  }
}
