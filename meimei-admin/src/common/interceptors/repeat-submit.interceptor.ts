/*
 * @Author: Sheng.Jiang
 * @Date: 2022-01-19 12:56:14
 * @LastEditTime: 2022-01-19 14:05:33
 * @LastEditors: Sheng.Jiang
 * @Description: 防止重复提交装饰器
 * @FilePath: \meimei-admin\src\common\interceptors\repeat-submit.interceptor.ts
 * You can you up，no can no bb！！
 */

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, concat } from 'rxjs';
import { REOEATSUBMIT_METADATA } from '../contants/decorator.contant';
import { Request } from 'express'
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { RepeatSubmitOption } from '../decorators/repeat-submit.decorator';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class RepeatSubmitInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @InjectRedis() private readonly redis: Redis
  ) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const repeatSubmitOption: RepeatSubmitOption = this.reflector.get(REOEATSUBMIT_METADATA, context.getHandler())
    if (!repeatSubmitOption) return next.handle()
    return concat(this.judge(context, repeatSubmitOption), next.handle())
  }

  /* 判断该请求是否频繁了 */
  async judge(context: ExecutionContext, repeatSubmitOption: RepeatSubmitOption) {
    const request: Request = context.switchToHttp().getRequest()
    const cache = await this.redis.get(request.url)
    const data = { body: request.body, prams: request.params, query: request.query }
    const dataString = JSON.stringify(data)
    if (!cache) {   //没有缓存数据
      if (dataString) {
        await this.redis.set(request.url, dataString, 'EX', repeatSubmitOption.interval)
      }
      return
    } else {
      if (dataString && cache === dataString) {
        throw new ApiException(repeatSubmitOption.message)
      }
      return;
    }
  }
}
