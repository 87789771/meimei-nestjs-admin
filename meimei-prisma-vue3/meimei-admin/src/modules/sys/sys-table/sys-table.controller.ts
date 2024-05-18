/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-05-17 19:47:46
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 20:27:35
 * @FilePath: /meimei-new/src/modules/sys/sys-table/sys-table.controller.ts
 * @Description:
 *
 */
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { SysTableService } from './sys-table.service';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { DataObj } from 'src/common/class/data-obj.class';
import { CreateMessagePipe } from 'src/common/pipes/createmessage.pipe';
import { AddSysTableDto, GetTableDto } from './dto/req-sys-table.dto';

@Controller('system/table')
export class SysTableController {
  constructor(private readonly sysTableService: SysTableService) {}

  /* 查询一条 */
  @Get()
  async getOne(
    @Query() getTableDto: GetTableDto,
    @User(UserEnum.userId) userId: number,
    @User(UserEnum.userName) userName: string,
  ) {
    const { tableId } = getTableDto;
    const config = await this.sysTableService.getOne(userId, userName, tableId);
    return DataObj.create(config);
  }

  @Post()
  async add(
    @Body(CreateMessagePipe) addSysTableDto: AddSysTableDto,
    @User(UserEnum.userId) userId: number,
    @User(UserEnum.userName) userName: string,
  ) {
    await this.sysTableService.add(userId, userName, addSysTableDto);
  }

  @Delete()
  async delete(
    @Query() getTableDto: GetTableDto,
    @User(UserEnum.userId) userId: number,
    @User(UserEnum.userName) userName: string,
  ) {
    const { tableId } = getTableDto;
    await this.sysTableService.delete(userId, userName, tableId);
  }
}
