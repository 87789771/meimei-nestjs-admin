/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-05-17 19:47:46
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-19 00:12:04
 * @FilePath: /meimei-nestjs-admin/meimei-prisma-vue3/meimei-admin/src/modules/monitor/online/online.service.ts
 * @Description: 
 * 
 */
import { Injectable } from '@nestjs/common';
import { OnlineList } from './dto/req-online.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import {
  USER_ONLINE_KEY,
  USER_TOKEN_KEY,
} from 'src/common/contants/redis.contant';
import { OnlineDto } from './dto/res-online.dto';

@Injectable()
export class OnlineService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  /* 查询在线用户 */
  async list(onlineList: OnlineList) {
    const tokenKeyArr = await this.redis.keys(`${USER_TOKEN_KEY}:*`);
    const prismaArr = tokenKeyArr.map((key) => {
      const onlineKey = USER_ONLINE_KEY + key.replace(USER_TOKEN_KEY, '');
      return this.redis
        .get(onlineKey)
        .then((lineUser) => JSON.parse(lineUser) as OnlineDto);
    });
    const list = await Promise.all(prismaArr);
    const { ipaddr, userName } = onlineList;
    return list.filter(
      (online) =>
        online &&
        online.ipaddr?.includes(ipaddr || '') &&
        online.userName?.includes(userName || ''),
    );
  }

  /* 强退用户 */
  async deletOnline(tokenKey: string) {
    await this.redis.del(tokenKey);
  }
}
