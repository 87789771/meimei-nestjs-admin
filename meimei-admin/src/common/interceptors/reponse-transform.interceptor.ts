/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:50:04
 * @LastEditTime: 2021-12-09 13:49:47
 * @LastEditors: Sheng.Jiang
 * @Description: 返回值转化拦截器
 * @FilePath: \meimei\src\common\interceptors\reponse-transform.interceptor.ts
 * You can you up，no can no bb！！
 */


import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AjaxResult } from '../class/ajax-result.class';
import { KEEP_KEY } from '../contants/decorator.contant';

@Injectable()
export class ReponseTransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(data => {
          // getHandler 值将覆盖 getClass上面的值
          const keep = this.reflector.getAllAndOverride<boolean>(
            KEEP_KEY,
            [
              context.getHandler(),
              context.getClass(),
            ]
          )
          if (keep) return data
          const response = context.switchToHttp().getResponse()
          response.header('Content-Type', 'application/json; charset=utf-8')
          return AjaxResult.success(data)
        })
      );
  }
}
