import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Inject,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataBaseDto } from '../dto/data-base.dto';
import { SysUser } from '@prisma/client';
import dayjs from 'dayjs';

@Injectable()
export class UpdateMessagePipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: any) {}
  transform(value: DataBaseDto, metadata: ArgumentMetadata) {
    const user: SysUser = this.request.user;
    value.updateBy = user.userName;
    value.updateTime = dayjs().format();
    return value;
  }
}
