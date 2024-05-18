/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-23 09:32:25
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-15 14:59:44
 * @FilePath: \meimei-new\src\common\filters\all-exception.filter.ts
 * @Description:
 *
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
    const { status, result } = this.errorResult(exception);
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

    let message: string;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = (response as any).message ?? response;
    } else {
      message = `${exception}`;
    }
    return {
      status,
      result: AjaxResult.error(message, code),
    };
  }
}
