/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-23 18:59:25
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-04-27 18:02:57
 * @FilePath: /meimei-new/src/common/decorators/repeat-submit.decorator.ts
 * @Description: 防重复提交装饰器
 * 
 */


import { SetMetadata } from '@nestjs/common';
import { REOEATSUBMIT_METADATA } from '../contants/decorator.contant';

export class RepeatSubmitOption {
  interval?: number = 1; //默认1s
  message?: string = '操作过于频繁';
}

export const RepeatSubmit = (option?: RepeatSubmitOption) => {
  const repeatSubmitOption = Object.assign(new RepeatSubmitOption(), option);
  return SetMetadata(REOEATSUBMIT_METADATA, repeatSubmitOption);
};
