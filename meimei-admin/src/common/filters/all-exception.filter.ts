/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 19:31:36
 * @LastEditTime: 2021-12-08 20:05:21
 * @LastEditors: Sheng.Jiang
 * @Description: 全局错误拦截器
 * @FilePath: \meimei\src\common\filters\all-exception.filter.ts
 * You can you up，no can no bb！！
 */


import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AjaxResult } from '../class/ajax-result.class';
import { ApiException } from '../exceptions/api.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { status, result } = this.errorResult(exception)
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.status(status).json(result);
  }

  /* 解析错误类型，获取状态码和返回值 */
  errorResult(exception: unknown) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrCode()
        : status;

    let message: string
    if (exception instanceof HttpException) {
      const response = exception.getResponse()
      message = (response as any).message ?? response
    } else {
      message = `${exception}`
    }
    return {
      status,
      result: AjaxResult.error(message, code)
    }
  }
}
