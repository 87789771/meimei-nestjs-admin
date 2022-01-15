/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 20:20:53
 * @LastEditTime: 2021-12-22 16:44:22
 * @LastEditors: Sheng.Jiang
 * @Description: 分页器管道
 * @FilePath: \meimei\src\common\pipes\pagination.pipe.ts
 * You can you up，no can no bb！！
 */



import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const skip = value.pageNum ? (value.pageNum - 1) * value.pageSize : 0
    const take = value.pageSize ?? 0
    value.skip = skip
    value.take = take
    return value;
  }
}
