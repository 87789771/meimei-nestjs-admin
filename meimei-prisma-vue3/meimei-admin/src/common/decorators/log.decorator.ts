/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 18:03:28
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 15:56:22
 * @FilePath: \meimei-new\src\common\decorators\log.decorator.ts
 * @Description: 接口日志装饰器
 *
 */

import { SetMetadata } from '@nestjs/common';
import { LOG_KEY_METADATA } from '../contants/decorator.contant';

/*
https://docs.nestjs.com/openapi/decorators#decorators
*/
export enum BusinessTypeEnum {
  /* 其他 */
  other = '0',

  /* 插入 */
  insert = '1',

  /* 更新 */
  update = '2',

  /* 删除 */
  delete = '3',

  /* 授权 */
  grant = '4',

  /* 导出 */
  export = '5',

  /* 导入 */
  import = '6',

  /* 强退 */
  force = '7',

  /* 生成代码 */
  code = '8',

  /* 清除 */
  clean = '9',
}

export class LogOption {
  /* 操作模块 */
  title: string;

  /* 操作功能 */
  businessType?: BusinessTypeEnum = BusinessTypeEnum.other;

  /* 是否保存请求的参数 */
  isSaveRequestData?: boolean = true;

  /* 是否保存响应的参数 */
  isSaveResponseData?: boolean = true;
}

export const Log = (logOption: LogOption) => {
  const option = Object.assign(new LogOption(), logOption);
  return SetMetadata(LOG_KEY_METADATA, option);
};
