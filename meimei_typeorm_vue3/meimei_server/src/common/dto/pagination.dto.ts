import { ApiHideProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class PaginationDto {
  /* 当前页 */
  @IsOptional()
  @Type()
  @IsNumber()
  public pageNum?: number

  /* 每页条数 */
  @IsOptional()
  @Type()
  @IsNumber()
  public pageSize?: number

  /* 排序字段 */
  @IsOptional()
  @Type()
  @IsString()
  public orderByColumn?: string

  /* 排序方式 */
  @IsOptional()
  @Type()
  @IsString()
  public isAsc?: string

  /* mysql忽略条数 */
  @ApiHideProperty()
  public skip: number
  /* mysql返回条数 */
  @ApiHideProperty()
  public take: number
}
