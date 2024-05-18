/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-23 15:27:19
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-16 11:32:35
 * @FilePath: \meimei-new\src\common\decorators\user.decorator.ts
 * @Description: 参数获取用户信息装饰器
 *
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInfo } from '../type/user-info.type';

export enum UserEnum {
  'userId' = 'userId',
  'userName' = 'userName',
  'nickName' = 'nickName',
  'deptId' = 'deptId',
  'permissions' = 'permissions',
  'roles' = 'roles',
  'dataScope' = 'dataScope',
}

// 设置在参数中 获取 哪些用户信息
export const User = createParamDecorator(
  (data: UserEnum, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserInfo = request.user;
    return data ? user && user[data] : user;
  },
);
