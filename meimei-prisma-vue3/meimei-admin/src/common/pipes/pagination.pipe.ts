/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 20:20:53
 * @LastEditTime: 2024-04-27 17:45:47
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @Description: 分页器管道
 * @FilePath: /meimei-new/src/common/pipes/pagination.pipe.ts
 * You can you up，no can no bb！！
 */

import { PipeTransform, Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(data: PaginationDto) {
    data.skip = data.pageNum ? (data.pageNum - 1) * data.pageSize : undefined;
    data.take = data.pageSize ?? undefined;
    return data;
  }
}
