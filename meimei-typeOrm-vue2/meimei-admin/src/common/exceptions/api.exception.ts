/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 19:28:34
 * @LastEditTime: 2022-09-18 11:07:37
 * @LastEditors: Please set LastEditors
 * @Description: 自定义异常
 * @FilePath: /meimei-admin/src/common/exceptions/api.exception.ts
 * You can you up，no can no bb！！
 */
import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  private errCode: number;
  constructor(msg: string, errCode?: number) {
    //权限问题一律使用401错误码
    if (errCode && errCode == 401) {
      super(msg, 200);
      this.errCode = 401;
    } else {
      //其他异常一律使用500错误码
      super(msg, errCode ?? 200);
      this.errCode = errCode ?? 500;
    }
  }
  getErrCode(): number {
    return this.errCode;
  }
}
