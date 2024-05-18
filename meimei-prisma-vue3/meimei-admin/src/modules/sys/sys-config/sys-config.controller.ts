/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 15:34:31
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-16 12:39:48
 * @FilePath: \meimei-new\src\modules\sys\sys-config\sys-config.controller.ts
 * @Description: 系统参数
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
import {
  AddSysConfigDto,
  GetSysConfigListDto,
  UpdateSysConfigDto,
} from './dto/req-sys-config.dto';
import { SysConfigService } from './sys-config.service';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { CreateMessagePipe } from 'src/common/pipes/createmessage.pipe';
import { DataObj } from 'src/common/class/data-obj.class';
import { AjaxResult } from 'src/common/class/ajax-result.class';
import { Keep } from 'src/common/decorators/keep.decorator';
import { UpdateMessagePipe } from 'src/common/pipes/updatemessage.pipe';
import { ExportSysConfigDto } from './dto/res-sys-config.dto';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { StringToArrPipe } from 'src/common/pipes/stringtoarr.pipe';

@Controller('system/config')
export class SysConfigController {
  constructor(
    private readonly sysConfigService: SysConfigService,
    private readonly excelService: ExcelService,
  ) {}

  /* 新增参数 */
  @RepeatSubmit()
  @Post()
  @Log({
    title: '系统参数',
    businessType: BusinessTypeEnum.insert,
  })
  @RequiresPermissions('system:config:add')
  async add(@Body(CreateMessagePipe) addSysConfigDto: AddSysConfigDto) {
    await this.sysConfigService.add(addSysConfigDto);
  }

  /* 分页查询参数列表 */
  @Get('list')
  @RequiresPermissions('system:config:query')
  async list(@Query(PaginationPipe) getSysConfigListDto: GetSysConfigListDto) {
    return await this.sysConfigService.list(getSysConfigListDto);
  }

  /* 清除缓存 */
  @Delete('refreshCache')
  @Log({
    title: '系统参数',
    businessType: BusinessTypeEnum.clean,
  })
  async refreshCache() {
    return await this.sysConfigService.refreshCache();
  }

  /* 通过 configKey 查询参数(缓存查询) */
  @Get('/configKey/:configKey')
  @Keep()
  async oneByconfigKey(@Param('configKey') configKey: string) {
    const configValue = await this.sysConfigService.oneByconfigKey(configKey);
    return AjaxResult.success(configValue, configValue || '');
  }

  /* 通过id查询参数 */
  @Get(':configId')
  @RequiresPermissions('system:config:query')
  async one(@Param('configId') configId: number) {
    const sysConfig = await this.sysConfigService.findById(configId);
    return DataObj.create(sysConfig);
  }

  /* 修改参数 */
  @RepeatSubmit()
  @Put()
  @Log({
    title: '系统参数',
    businessType: BusinessTypeEnum.update,
  })
  @RequiresPermissions('system:config:edit')
  async updata(
    @Body(UpdateMessagePipe) updateSysConfigDto: UpdateSysConfigDto,
  ) {
    await this.sysConfigService.update(updateSysConfigDto);
  }

  /* 删除参数 */
  @Delete(':configIds')
  @Log({
    title: '系统参数',
    businessType: BusinessTypeEnum.delete,
  })
  @RequiresPermissions('system:config:remove')
  async delete(
    @Param('configIds', new StringToArrPipe()) configIdArr: number[],
  ) {
    await this.sysConfigService.delete(configIdArr);
  }

  /* 导出 */
  @RepeatSubmit()
  @Post('export')
  @RequiresPermissions('system:config:export')
  @Log({
    title: '系统参数',
    businessType: BusinessTypeEnum.export,
  })
  @Keep()
  async export(@Body() getSysConfigListDto: GetSysConfigListDto) {
    const { rows } = await this.sysConfigService.list(getSysConfigListDto);
    const file = await this.excelService.export(ExportSysConfigDto, rows);
    return new StreamableFile(file);
  }
}
