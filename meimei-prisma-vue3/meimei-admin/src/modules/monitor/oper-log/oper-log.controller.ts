/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-11 14:49:47
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 23:20:22
 * @FilePath: /meimei-new/src/modules/monitor/oper-log/oper-log.controller.ts
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
  Query,
  StreamableFile,
} from '@nestjs/common';
import { OperLogService } from './oper-log.service';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { GetOperLogListDto } from './dto/req-oper-log.dto';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { StringToArrPipe } from 'src/common/pipes/stringtoarr.pipe';
import { Keep } from 'src/common/decorators/keep.decorator';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ExportOperLogDto } from './dto/res-oper-log.dto';

@Controller('monitor/operlog')
export class OperLogController {
  constructor(
    private readonly operLogService: OperLogService,
    private readonly excelService: ExcelService,
  ) {}

  /* 分页查询 */
  @Get('list')
  @RequiresPermissions('monitor:operlog:query')
  async list(@Query(PaginationPipe) getOperLogListDto: GetOperLogListDto) {
    return await this.operLogService.list(getOperLogListDto);
  }

  /* 清空操作记录 */
  @Delete('clean')
  @RequiresPermissions('monitor:operlog:remove')
  @Log({
    title: '操作日志管理',
    businessType: BusinessTypeEnum.clean,
  })
  async cleanOperLog() {
    await this.operLogService.cleanOperLog();
  }

  /* 删除操作日志 */
  @Delete(':operLogIds')
  @RequiresPermissions('monitor:operlog:remove')
  @Log({
    title: '操作日志管理',
    businessType: BusinessTypeEnum.delete,
  })
  async deleteOperLog(
    @Param('operLogIds', new StringToArrPipe()) operLogIdArr: number[],
  ) {
    await this.operLogService.deleteOperLog(operLogIdArr);
  }

  /* 导出操作日志 */
  @Post('export')
  @RequiresPermissions('monitor:operlog:export')
  @Keep()
  @Log({
    title: '操作日志管理',
    businessType: BusinessTypeEnum.export,
  })
  async exportOperlog(@Body() getOperLogListDto: GetOperLogListDto) {
    const { rows } = await this.operLogService.list(getOperLogListDto);
    const file = await this.excelService.export(ExportOperLogDto, rows);
    return new StreamableFile(file);
  }
}
