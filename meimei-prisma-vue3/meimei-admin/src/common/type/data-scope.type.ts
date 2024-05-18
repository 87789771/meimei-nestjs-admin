/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-05-16 19:10:45
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-16 20:06:39
 * @FilePath: /meimei-new/src/common/type/data-scope.type.ts
 * @Description: 
 * 
 */
export type DataScope = {
  deptIds: number[] | undefined;
  userName: string | undefined;
  OR: { deptId?: any; createBy?: any }[];
};
