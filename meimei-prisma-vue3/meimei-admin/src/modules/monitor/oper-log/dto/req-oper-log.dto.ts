/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 22:07:09
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 16:41:52
 * @FilePath: \meimei-new\src\modules\monitor\oper-log\dto\req-oper-log.dto.ts
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
export class GetOperLogListDto extends PaginationDto {
  /* 系统模块 */
  @IsOptional()
  @IsString()
  title?: string;

  /* 操作人员*/
  @IsOptional()
  @IsString()
  operName?: string;

  /* 类型 */
  @IsOptional()
  @IsString()
  businessType?: string;

  /* 状态 */
  @IsOptional()
  @IsString()
  status?: string;

  /* 操作时间 */
  @IsOptional()
  @IsObject()
  @Transform(({ value }) => transformDate(value))
  params?: ParamsDto = {};
}

/* 新增 */
export class AddOperLogDto {
  /* 模块标题 */
  @Excel({
    name: '模块标题',
  })
  title: string;

  /* '业务类型 */
  @Excel({
    name: '业务类型',
    dictType: 'sys_oper_type',
  })
  businessType: string;

  /* 方法名称 */
  @Excel({
    name: '方法名称',
  })
  method: string;

  /* 请求方式 */
  @Excel({
    name: '请求方式',
  })
  requestMethod: string;

  /* 操作类别（0其它 1后台用户 2手机端用户） */
  operatorType: number;

  /* 操作人员 */
  @Excel({
    name: '操作人员',
  })
  operName: string;

  /* 部门名称 */
  deptName: string;

  /* 请求URL */
  @Excel({
    name: '请求URL',
  })
  operUrl: string;

  /* 主机地址 */
  @Excel({
    name: '主机地址',
  })
  operIp: string;

  /* 操作地点 */
  @Excel({
    name: '操作地点',
  })
  operLocation: string;

  /* 请求参数 */
  operParam: string;

  /* 返回参数 */
  jsonResult: string;

  /* 操作状态（0正常 1异常） */
  @Excel({
    name: '操作状态',
    dictType: 'sys_common_status',
  })
  status: string;

  /* 返回参数 */
  errorMsg: string;

  /* 操作时间 */
  @Excel({
    name: '操作时间',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  operTime: string;

  /* 操作时长 */
  @Excel({
    name: '操作时长',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  costTime?: number;
}
