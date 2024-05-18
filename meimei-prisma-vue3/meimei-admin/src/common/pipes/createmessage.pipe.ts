/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-28 10:31:51
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-04-28 10:54:10
 * @FilePath: \meimei-new\src\common\pipes\createmessage.pipe.ts
 * @Description: 参数中增加创建信息管道
 *
 */

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Inject,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { SysUser } from '@prisma/client';
import { DataBaseDto } from '../dto/data-base.dto';
import dayjs from 'dayjs';

@Injectable()
export class CreateMessagePipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: any) {}
  transform(value: DataBaseDto, metadata: ArgumentMetadata) {
    const user: SysUser = this.request.user;
    value.createBy = user.userName;
    value.createTime = dayjs().format();
    return value;
  }
}
