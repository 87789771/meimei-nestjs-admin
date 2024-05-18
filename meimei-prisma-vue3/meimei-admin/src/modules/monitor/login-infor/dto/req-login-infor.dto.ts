/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 22:07:09
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 22:59:03
 * @FilePath: /meimei-new/src/modules/monitor/login-infor/dto/req-login-infor.dto.ts
 * @Description:
 *
 */

import { Transform } from 'class-transformer';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { transformDate } from 'src/common/func/transform-date.func';
import { Excel } from 'src/modules/common/excel/excel.decorator';

/* 分页查询 */
export class GetLoginInforListDto extends PaginationDto {
  /* 登录地址 */
  @IsOptional()
  @IsString()
  ipaddr?: string;

  /* 用户名 */
  @IsOptional()
  @IsString()
  userName?: string;

  /* 状态 */
  @IsOptional()
  @IsString()
  status?: string;

  /* 登录 */
  @IsOptional()
  @IsObject()
  @Transform(({ value }) => transformDate(value))
  params?: ParamsDto = {};
}

/* 新增 */
export class AddLoginInforDto {
  /* 用户账号 */
  @Excel({
    name: '用户账号',
  })
  userName: string;

  /* 登录IP地址 */
  @Excel({
    name: '登录IP地址',
  })
  ipaddr: string;

  /* 登录地点 */
  @Excel({
    name: '登录地点',
  })
  loginLocation: string;

  /* 浏览器类型 */
  @Excel({
    name: '浏览器类型',
  })
  browser: string;

  /* 浏览器操作系统类型 */
  @Excel({
    name: '浏览器操作系统类型',
  })
  os: string;

  /* 登录状态（0成功 1失败） */
  @Excel({
    name: '登录状态',
    dictType: 'sys_common_status',
  })
  status: string;

  /* 提示消息 */
  @Excel({
    name: '登录状态',
  })
  msg: string;

  /* 访问时间 */
  @Excel({
    name: '操作时间',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  loginTime: string;
}
