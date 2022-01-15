/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-22 12:54:54
 * @LastEditTime: 2021-12-22 17:08:51
 * @LastEditors: Sheng.Jiang
 * @Description: 角色权限装饰器
 * @FilePath: \meimei\src\common\decorators\requires-roles.decorator.ts
 * You can you up，no can no bb！！
 */
import { SetMetadata } from "@nestjs/common"
import { ROLES_KEY_METADATA } from "../contants/decorator.contant"
import { LogicalEnum } from "../enums/logical.enum"

export type RoleObj = {
  roleArr: string[]
  logical: LogicalEnum
}

export const RequiresRoles = (roles: string | string[], logical: LogicalEnum = LogicalEnum.or) => {
  let roleObj: RoleObj = {
    roleArr: [],
    logical
  }
  if (typeof roles === 'string') {
    roleObj = {
      roleArr: [roles],
      logical
    }
  } else if (roles instanceof Array) {
    roleObj = {
      roleArr: roles,
      logical
    }
  }
  return SetMetadata(ROLES_KEY_METADATA, roleObj)
}