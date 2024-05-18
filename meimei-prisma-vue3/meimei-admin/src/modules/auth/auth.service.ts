/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-23 19:15:56
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-18 10:19:04
 * @FilePath: /meimei-new/src/modules/auth/auth.service.ts
 * @Description: 用户身份校验
 *
 */
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { ApiException } from 'src/common/exceptions/api.exception';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import {
  CAPTCHA_IMG_KEY,
  USER_INFO_KEY,
  USER_TOKEN_KEY,
  USER_VERSION_KEY,
} from 'src/common/contants/redis.contant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly prisma: PrismaService,
  ) {}

  /* 判断验证码是否正确 */
  async checkImgCaptcha(uuid: string, code: string) {
    const result = await this.redis.get(`${CAPTCHA_IMG_KEY}:${uuid}`);
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase()) {
      throw new ApiException('验证码错误');
    }
    await this.redis.del(`${CAPTCHA_IMG_KEY}:${uuid}`);
  }

  /* 判断用户账号密码是否正确 */
  async validateUser(userName: string, password: string) {
    const user = await this.prisma.sysUser.findUnique({
      include: {
        dept: true,
      },
      where: {
        userName,
        delFlag: '0',
        status: '0',
      },
    });
    if (!user) throw new ApiException('用户名或密码错误');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiException('用户名或密码错误');
    return user;
  }

  /* 判断token 是否过期 或者被重置 */
  async validateToken(userId: number, pv: number, restoken: string) {
    const token = await this.redis.get(`${USER_TOKEN_KEY}:${userId}`);
    if (restoken !== token) throw new ApiException('登录状态已过期', 401);
    const passwordVersion = await this.redis.get(
      `${USER_VERSION_KEY}:${userId}`,
    );
    if (pv.toString() !== passwordVersion)
      throw new ApiException('用户信息或全权限范围已被修改', 401);
    const userString = await this.redis.get(`${USER_INFO_KEY}:${userId}`);
    if (userString) {
      return JSON.parse(userString);
    }
  }
}
