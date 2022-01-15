/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-09 10:11:33
 * @LastEditTime: 2022-01-05 20:01:11
 * @LastEditors: Sheng.Jiang
 * @Description: 分页请求参数
 * @FilePath: \meimei\src\common\dto\pagination.dto.ts
 * You can you up，no can no bb！！
 */
import { ApiHideProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

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