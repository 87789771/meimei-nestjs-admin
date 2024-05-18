/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 16:58:02
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-04-27 16:59:34
 * @FilePath: /meimei-new/src/common/dto/paginated.dto.ts
 * @Description: 分页返回值
 * 
 */

export class PaginatedDto<T> {
  /* 总条数 */
  total: number;

  rows: T[];
}
