import { SysDept, SysPost, SysRole, SysUser } from '@prisma/client';
import { DataScope } from './data-scope.type';

export type UserInfo = SysUser & {
  dept?: SysDept;
  roles: SysRole[];
  posts: SysPost[];
  permissions: string[];
  dataScope: DataScope;
};
