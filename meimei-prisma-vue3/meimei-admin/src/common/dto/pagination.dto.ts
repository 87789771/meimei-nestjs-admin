/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 16:58:02
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-04-27 17:44:39
 * @FilePath: /meimei-new/src/common/dto/pagination.dto.ts
 * @Description: 分页器参数
 *
 */

import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginationDto {
  /* 当前页 */
  @IsOptional()
  @Type()
  @IsNumber()
  @Min(1)
  public pageNum?: number;

  /* 每页条数 */
  @IsOptional()
  @Type()
  @IsNumber()
  @Min(1)
  public pageSize?: number;

  /* 排序字段 */
  @IsOptional()
  @Type()
  @IsString()
  public orderByColumn?: string;

  /* 排序方式 */
  @IsOptional()
  @Type()
  @IsString()
  public isAsc?: string;

  /* mysql忽略条数 */
  public skip: number;

  /* mysql返回条数 */
  public take: number;
}
