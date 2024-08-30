import { SetMetadata } from '@nestjs/common'
import { DATASCOPE_KEY_METADATA } from '../contants/decorator.contant'

export class DeptOrUserAlias {
  deptAlias?: string = 'dept'
  userAlias?: string = 'user'
}
export const DataScope = (deptOrUserAlias?: DeptOrUserAlias) => {
  const aliaObj = Object.assign(new DeptOrUserAlias(), deptOrUserAlias)
  return SetMetadata(DATASCOPE_KEY_METADATA, aliaObj)
}
