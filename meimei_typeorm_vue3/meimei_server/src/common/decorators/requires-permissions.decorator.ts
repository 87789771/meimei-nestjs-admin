import { SetMetadata } from '@nestjs/common'
import { PERMISSION_KEY_METADATA } from '../contants/decorator.contant'
import { LogicalEnum } from '../enums/logical.enum'

export type PermissionObj = {
  permissionArr: string[]
  logical: LogicalEnum
}

export const RequiresPermissions = (permissions: string | string[], logical: LogicalEnum = LogicalEnum.or) => {
  let permissionObj: PermissionObj = {
    permissionArr: [],
    logical,
  }
  if (typeof permissions === 'string') {
    permissionObj = {
      permissionArr: [permissions],
      logical,
    }
  } else if (permissions instanceof Array) {
    permissionObj = {
      permissionArr: permissions,
      logical,
    }
  }
  return SetMetadata(PERMISSION_KEY_METADATA, permissionObj)
}
