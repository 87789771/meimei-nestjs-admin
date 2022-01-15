/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:57:03
 * @LastEditTime: 2021-12-08 18:57:52
 * @LastEditors: Sheng.Jiang
 * @Description: 保持原数据返回的装饰器
 * @FilePath: \meimei\src\common\decorators\keep.decorator.ts
 * You can you up，no can no bb！！
 */


import { SetMetadata } from "@nestjs/common";
import { KEEP_KEY } from "../contants/decorator.contant";

export const Keep = () => SetMetadata(KEEP_KEY, true)