/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-10 16:02:38
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-10 16:57:05
 * @FilePath: \meimei-new\src\common\pipes\stringtoarr.pipe.ts
 * @Description: 将 ‘,’ 拼接的字符串转化为数组
 *
 */
/*
https://docs.nestjs.com/pipes
*/

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

/* 该管道必须手动实例化 */
@Injectable()
export class StringToArrPipe implements PipeTransform {
  constructor(private readonly func: Function = Number) {}
  transform(value: string, { metatype }: ArgumentMetadata) {
    if (!metatype || metatype !== Array) {
      return value;
    } else {
      let result = value.split(',').map((item) => this.func(item));
      return result;
    }
  }
}
