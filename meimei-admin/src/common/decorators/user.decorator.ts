/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export enum UserEnum {
  'userId' = 'userId',
  'userName' = 'userName',
  'nickName' = 'nickName',
  'deptId' = 'deptId',
  'deptName' = 'deptName',
}

// 设置在参数中 获取 哪些用户信息
export const User = createParamDecorator(
  (data: UserEnum, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user && user.userId : user;
  },
);
