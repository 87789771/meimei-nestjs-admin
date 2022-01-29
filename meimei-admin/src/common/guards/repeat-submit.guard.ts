/*
 * @Author: Sheng.Jiang
 * @Date: 2022-01-29 11:06:07
 * @LastEditTime: 2022-01-29 11:10:54
 * @LastEditors: Sheng.Jiang
 * @Description: 防止重复提交守卫
 * @FilePath: \meimei-admin\src\common\guards\repeat-submit.guard.ts
 * You can you up，no can no bb！！
 */
/*
https://docs.nestjs.com/guards#guards
*/

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REOEATSUBMIT_METADATA } from '../contants/decorator.contant';
import { RepeatSubmitOption } from '../decorators/repeat-submit.decorator';
import { Request } from 'express'
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class RepeatSubmitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRedis() private readonly redis: Redis
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const repeatSubmitOption: RepeatSubmitOption = this.reflector.get(REOEATSUBMIT_METADATA, context.getHandler())
    if (!repeatSubmitOption) return true
    const request: Request = context.switchToHttp().getRequest()
    const cache = await this.redis.get(request.url)
    const data = { body: request.body, prams: request.params, query: request.query }
    const dataString = JSON.stringify(data)
    if (!cache) {   //没有缓存数据
      if (dataString) {
        await this.redis.set(request.url, dataString, 'EX', repeatSubmitOption.interval)
      }
    } else {
      if (dataString && cache === dataString) {
        throw new ApiException(repeatSubmitOption.message)
      }
    }
    return true
  }
}
