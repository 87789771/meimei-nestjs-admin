import Redis from 'ioredis'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { USER_DEPTID_KEY, USER_DEPTNAME_KEY, USER_NICKNAME_KEY, USER_USERNAME_KEY } from '../contants/redis.contant'
import { UserEnum } from '../decorators/user.decorator'

@Injectable()
export class UserInfoPipe implements PipeTransform {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const { data } = metadata
    if (!data) return value
    if (data === UserEnum.userId) return value
    if (data === UserEnum.userName) return await this.redis.get(`${USER_USERNAME_KEY}:${value}`)
    if (data === UserEnum.nickName) return await this.redis.get(`${USER_NICKNAME_KEY}:${value}`)
    if (data === UserEnum.deptId) return await this.redis.get(`${USER_DEPTID_KEY}:${value}`)
    if (data === UserEnum.deptName) return await this.redis.get(`${USER_DEPTNAME_KEY}:${value}`)
  }
}
