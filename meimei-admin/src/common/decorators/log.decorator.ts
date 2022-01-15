/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-22 16:54:36
 * @LastEditTime: 2021-12-23 13:39:58
 * @LastEditors: Sheng.Jiang
 * @Description: 日志记录装饰器
 * @FilePath: \meimei\src\common\decorators\log.decorator.ts
 * You can you up，no can no bb！！
 */
import { SetMetadata } from "@nestjs/common"
import { LOG_KEY_METADATA } from "../contants/decorator.contant"

/*
https://docs.nestjs.com/openapi/decorators#decorators
*/
export enum BusinessTypeEnum {
  /* 其他 */
  other = "1",

  /* 插入 */
  insert = "2",

  /* 更新 */
  update = "3",

  /* 删除 */
  delete = "4",

  /* 授权 */
  grant = "5",

  /* 导出 */
  export = "6",

  /* 导入 */
  import = "7",

  /* 强退 */
  force = "8",

  /* 清除 */
  clean = "9",
}

export class LogOption {
  /* 操作模块 */
  title: string

  /* 操作功能 */
  businessType?: BusinessTypeEnum = BusinessTypeEnum.other

  /* 是否保存请求的参数 */
  isSaveRequestData?: boolean = true

  /* 是否保存响应的参数 */
  isSaveResponseData?: boolean = true
}

export const Log = (logOption: LogOption) => {
  const option = Object.assign(new LogOption(), logOption)
  return SetMetadata(LOG_KEY_METADATA, option)
}