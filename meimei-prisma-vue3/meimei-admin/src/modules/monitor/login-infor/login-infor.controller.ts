/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-11 14:49:47
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-12 17:05:55
 * @FilePath: /meimei-new/src/modules/monitor/login-infor/login-infor.controller.ts
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
import { LoginInforService } from './login-infor.service';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { GetLoginInforListDto } from './dto/req-login-infor.dto';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { StringToArrPipe } from 'src/common/pipes/stringtoarr.pipe';
import { Keep } from 'src/common/decorators/keep.decorator';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ExportLoginInforDto } from './dto/res-login-infor.dto';

@Controller('monitor/logininfor')
export class LoginInforController {
  constructor(
    private readonly loginInforService: LoginInforService,
    private readonly excelService: ExcelService,
  ) {}

  /* 分页查询 */
  @Get('list')
  @RequiresPermissions('monitor:logininfor:query')
  async list(
    @Query(PaginationPipe) getLoginInforListDto: GetLoginInforListDto,
  ) {
    return await this.loginInforService.list(getLoginInforListDto);
  }

  /* 清空登录记录 */
  @Delete('clean')
  @RequiresPermissions('monitor:logininfor:remove')
  @Log({
    title: '登录日志管理',
    businessType: BusinessTypeEnum.clean,
  })
  async cleanLoginInfor() {
    await this.loginInforService.cleanLoginInfor();
  }

  /* 删除登录日志 */
  @Delete(':loginInforIds')
  @RequiresPermissions('monitor:logininfor:remove')
  @Log({
    title: '登录日志管理',
    businessType: BusinessTypeEnum.delete,
  })
  async deleteLoginInfor(
    @Param('loginInforIds', new StringToArrPipe()) loginInforIdArr: number[],
  ) {
    await this.loginInforService.deleteLoginInfor(loginInforIdArr);
  }

  /* 导出登录日志 */
  @Post('export')
  @RequiresPermissions('monitor:logininfor:export')
  @Keep()
  @Log({
    title: '登录日志管理',
    businessType: BusinessTypeEnum.export,
  })
  async exportOperlog(@Body() getLoginInforListDto: GetLoginInforListDto) {
    const { rows } = await this.loginInforService.list(getLoginInforListDto);
    const file = await this.excelService.export(ExportLoginInforDto, rows);
    return new StreamableFile(file);
  }

  /* 解锁 */
  @Get('unlock/:userName')
  async(@Param('userName') userName: string) {
    console.log(userName);
    return;
  }
}
