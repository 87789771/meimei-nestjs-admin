import { Type } from 'class-transformer'
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/common/dto/pagination.dto'
import { ParamsDto } from 'src/common/dto/params.dto'

/* 分页查询操作日志 */
export class ReqOperLogDto extends PaginationDto {
  /* 系统模块 */
  @IsOptional()
  @IsString()
  title?: string

  /* 操作人员*/
  @IsOptional()
  @IsString()
  operName?: string

  /* 类型 */
  @IsOptional()
  @IsString()
  businessType?: string

  /* 状态 */
  @IsOptional()
  @IsNumber()
  status?: number

  /* 操作时间 */
  @IsOptional()
  @IsObject()
  params?: ParamsDto
}

/* 分页查询登录日志 */
export class ReqLogininforDto extends PaginationDto {
  /* 登录地址 */
  @IsOptional()
  @IsString()
  ipaddr?: string

  /* 用户名 */
  @IsOptional()
  @IsString()
  userName?: string

  /* 状态 */
  @IsOptional()
  @Type()
  @IsString()
  status?: string

  /* 登录 */
  @IsOptional()
  @IsObject()
  params?: ParamsDto
}

/* 在线用户查询 */
export class ReqOnline {
  /* 登录地址 */
  @IsOptional()
  @IsString()
  ipaddr?: string

  /* 用户名 */
  @IsOptional()
  @IsString()
  userName?: string
}
