/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-30 14:43:37
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2025-06-14 23:26:56
 * @FilePath: /goods-nest-admin/src/modules/common/excel/excel.decorator.ts
 * @Description: 
 * 
 */
import 'reflect-metadata';
import { ExcelOption } from './excel.interface';
import { EXCEL_ARR_KRY } from './excel.constant';
import { ColumnTypeEnum, ExcelTypeEnum } from './excel.enum';
/* 
  getMetadata 方法，如果当前类型的元数据不存在，将会对其父类型上的元数据进行查找。
  getOwnMetadata 方法， 只会对当前类型上的元数据进行查找。

  列如下面的的操作 ，凡是继承了 BaseEntity类的， 如果该类上的 元数据不存在，将会对 BaseEntity类上的元数据 进行查找。
*/
export const Excel = (option: ExcelOption): PropertyDecorator => {
  return (target: any, propertyKey: string | symbol) => {
    const old = Reflect.getMetadata(`${EXCEL_ARR_KRY}`, target.constructor);
    const obj = Object.assign(
      {
        sort: 1,
        type: ExcelTypeEnum.ALL,
        t: ColumnTypeEnum.string,
      },
      option,
      {
        propertyKey,
      },
    ); //添加默认值

    if (old) {
      // 使用数组的 concat 方法创建新数组，避免修改原数组
      const exportArr = old.concat([obj]);
      Reflect.defineMetadata(`${EXCEL_ARR_KRY}`, exportArr, target.constructor);
    } else {
      Reflect.defineMetadata(`${EXCEL_ARR_KRY}`, [obj], target.constructor);
    }
  };
};
