/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-09 11:10:48
 * @LastEditTime: 2021-12-13 15:44:10
 * @LastEditors: Sheng.Jiang
 * @Description: 分页响应参数
 * @FilePath: \meimei\src\common\dto\paginated.dto.ts
 * You can you up，no can no bb！！
 */
import { ApiHideProperty } from "@nestjs/swagger"

export class PaginatedDto<T> {
    /* 总条数 */
    total: number

    @ApiHideProperty()
    rows: T[]
}