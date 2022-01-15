/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-22 13:22:00
 * @LastEditTime: 2021-12-22 13:58:41
 * @LastEditors: Sheng.Jiang
 * @Description: 权限守卫
 * @FilePath: \meimei\src\common\guards\role-auth.guard copy.ts
 * You can you up，no can no bb！！
 */


import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY_METADATA } from '../contants/decorator.contant';
import { USER_ROLEKEYS_KEY } from '../contants/redis.contant';
import { RoleObj } from '../decorators/requires-roles.decorator';
import { LogicalEnum } from '../enums/logical.enum';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRedis() private readonly redis: Redis
  ) { }
  async canActivate(
    context: ExecutionContext,
  ) {
    const roleObj = this.reflector.getAllAndOverride<RoleObj>(ROLES_KEY_METADATA, [context.getHandler(), context.getClass()])
    if (!roleObj || !roleObj.roleArr.length) return true;
    const request = context.switchToHttp().getRequest()
    const userId = request.user?.userId
    const userRoleArr = JSON.parse(await this.redis.get(`${USER_ROLEKEYS_KEY}:${userId}`))
    if (userRoleArr.includes("admin")) return true;
    let result: boolean = false
    if (roleObj.logical === LogicalEnum.or) {
      result = roleObj.roleArr.some((userPermission) => {
        return userRoleArr.includes(userPermission)
      })
    } else if (roleObj.logical === LogicalEnum.and) {
      result = roleObj.roleArr.every((userPermission) => {
        return userRoleArr.includes(userPermission)
      })
    }
    if (!result) throw new ApiException('暂无权限访问，请联系管理员')
    return result
  }
}
