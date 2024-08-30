import { Post } from '../../post/entities/post.entity'
import { Role } from '../../role/entities/role.entity'
import { User } from '../entities/user.entity'

export class ResUserDto extends User {
  /* 岗位Id */
  deptId: number

  /* 岗位Id数组 */
  postIds: number[]

  /* 角色Id数组 */
  roleIds: number[]
}

/* 用户信息 */
export class ResUserInfoDto {
  /* 用户信息 */
  data?: ResUserDto

  /* 用户的岗位id数组 */
  postIds?: number[]

  /* 用户的角色Id数组 */
  roleIds?: number[]

  /* 下拉岗位数组 */
  posts: Post[]

  /* 下拉角色数组 */
  roles: Role[]
}

export class ResHasRoleDto extends Role {
  /* 用户是否有该角色 */
  flag: boolean
}

export class ResAuthRoleDto {
  roles: ResHasRoleDto[]
  user: User
}
