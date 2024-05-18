/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-23 18:59:25
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-04-27 21:41:32
 * @FilePath: /meimei-new/src/common/guards/role-auth.guard.ts
 * @Description: 角色守卫
 *
 */

import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY_METADATA } from '../contants/decorator.contant';
import { RoleObj } from '../decorators/requires-roles.decorator';
import { LogicalEnum } from '../enums/logical.enum';
import { ApiException } from '../exceptions/api.exception';
import Redis from 'ioredis';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roleObj = this.reflector.getAllAndOverride<RoleObj>(
      ROLES_KEY_METADATA,
      [context.getHandler(), context.getClass()],
    );
    if (!roleObj || !roleObj.roleArr.length) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userRoleArr = (user?.roles || []).map((item) => item.roleKey);
    if (userRoleArr.includes('admin')) return true;
    let result = false;
    if (roleObj.logical === LogicalEnum.or) {
      result = roleObj.roleArr.some((userPermission) => {
        return userRoleArr.includes(userPermission);
      });
    } else if (roleObj.logical === LogicalEnum.and) {
      result = roleObj.roleArr.every((userPermission) => {
        return userRoleArr.includes(userPermission);
      });
    }
    if (!result) throw new ApiException('暂无权限访问，请联系管理员');
    return result;
  }
}
