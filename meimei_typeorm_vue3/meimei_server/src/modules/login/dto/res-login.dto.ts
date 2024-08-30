import { User } from 'src/modules/system/user/entities/user.entity'

export class ResImageCaptchaDto {
  /* base64图片编码 */
  img: string

  /* uuid码 */
  uuid: string
}

export class ResLoginDto {
  /* token密匙 */
  token: string
}

export class ResInfo {
  /* 权限标识 */
  permissions: string[]

  /* 角色标识 */
  roles: string[]

  /* 用户信息 */
  user: User
}
