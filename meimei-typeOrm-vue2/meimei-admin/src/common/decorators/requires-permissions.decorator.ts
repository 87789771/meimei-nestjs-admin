/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-22 12:55:33
 * @LastEditTime: 2022-09-18 11:08:03
 * @LastEditors: Please set LastEditors
 * @Description: 操作权限装饰器
 * @FilePath: /meimei-admin/src/common/decorators/requires-permissions.decorator.ts
 * You can you up，no can no bb！！
 */
/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { SetMetadata } from '@nestjs/common';
import { PERMISSION_KEY_METADATA } from '../contants/decorator.contant';
import { LogicalEnum } from '../enums/logical.enum';

export type PermissionObj = {
  permissionArr: string[];
  logical: LogicalEnum;
};

export const RequiresPermissions = (
  permissions: string | string[],
  logical: LogicalEnum = LogicalEnum.or,
) => {
  let permissionObj: PermissionObj = {
    permissionArr: [],
    logical,
  };
  if (typeof permissions === 'string') {
    permissionObj = {
      permissionArr: [permissions],
      logical,
    };
  } else if (permissions instanceof Array) {
    permissionObj = {
      permissionArr: permissions,
      logical,
    };
  }
  return SetMetadata(PERMISSION_KEY_METADATA, permissionObj);
};
