/*
https://docs.nestjs.com/controllers#controllers
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
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { Keep } from 'src/common/decorators/keep.decorator';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ReqLogininforDto, ReqOperLogDto } from './dto/req-log.dto';
import { Logininfor } from './entities/logininfor.entity';
import { OperLog } from './entities/oper_log.entity';
import { LogService } from './log.service';
@ApiTags('日志管理')
@Controller('monitor')
export class LogController {
  constructor(
    private readonly logService: LogService,
    private readonly excelService: ExcelService,
  ) {}
  /* 分页查询操作记录 */
  @Get('operlog/list')
  @RequiresPermissions('monitor:operlog:query')
  @ApiPaginatedResponse(OperLog)
  async operLogList(@Query(PaginationPipe) reqOperLogDto: ReqOperLogDto) {
    return await this.logService.operLogList(reqOperLogDto);
  }

  /* 清空操作记录 */
  @Delete('operlog/clean')
  @RequiresPermissions('monitor:operlog:remove')
  @Log({
    title: '日志管理',
    businessType: BusinessTypeEnum.clean,
  })
  async cleanOperLog() {
    await this.logService.cleanOperLog();
  }

  /* 删除操作日志 */
  @Delete('operlog/:operLogIds')
  @RequiresPermissions('monitor:operlog:remove')
  @Log({
    title: '日志管理',
    businessType: BusinessTypeEnum.delete,
  })
  async deleteOperLog(@Param('operLogIds') operLogIds: string) {
    const operLogArr = operLogIds.split(',');
    await this.logService.deleteOperLog(operLogArr);
  }

  /* 导出操作日志 */
  @Post('operlog/export')
  @RequiresPermissions('monitor:operlog:export')
  @Keep()
  @Log({
    title: '日志管理',
    businessType: BusinessTypeEnum.export,
    isSaveResponseData: false,
  })
  async exportOperlog(@Body(PaginationPipe) reqOperLogDto: ReqOperLogDto) {
    const { rows } = await this.logService.operLogList(reqOperLogDto);
    const file = await this.excelService.export(OperLog, rows);
    return new StreamableFile(file);
  }

  /* 分页查询登录日志 */
  @Get('logininfor/list')
  @ApiPaginatedResponse(Logininfor)
  @RequiresPermissions('monitor:logininfor:query')
  async logininforList(
    @Query(PaginationPipe) reqLogininforDto: ReqLogininforDto,
  ) {
    return await this.logService.logininforList(reqLogininforDto);
  }

  /* 清空登录日志 */
  @Delete('logininfor/clean')
  @RequiresPermissions('monitor:logininfor:remove')
  @Log({
    title: '日志记录',
    businessType: BusinessTypeEnum.clean,
  })
  async cleanLogininfor() {
    await this.logService.cleanLogininfor();
  }

  /* 删除操作日志 */
  @Delete('logininfor/:logininforIds')
  @RequiresPermissions('monitor:logininfor:remove')
  @Log({
    title: '日志记录',
    businessType: BusinessTypeEnum.delete,
  })
  async deleteLogininfor(@Param('logininforIds') logininforIds: string) {
    const logininforArr = logininforIds.split(',');
    await this.logService.deleteLogininfor(logininforArr);
  }

  /* 导出登录日志 */
  @Post('logininfor/export')
  @RequiresPermissions('monitor:logininfor:export')
  @Keep()
  @Log({
    title: '日志记录',
    businessType: BusinessTypeEnum.export,
    isSaveResponseData: false,
  })
  async exportLogininfor(
    @Body(PaginationPipe) reqLogininforDto: ReqLogininforDto,
  ) {
    const { rows } = await this.logService.logininforList(reqLogininforDto);
    const file = await this.excelService.export(Logininfor, rows);
    return new StreamableFile(file);
  }
}
