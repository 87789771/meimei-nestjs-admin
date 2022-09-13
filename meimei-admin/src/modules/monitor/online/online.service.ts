/*
https://docs.nestjs.com/providers#services
*/

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import {
  USER_ONLINE_KEY,
  USER_TOKEN_KEY,
} from 'src/common/contants/redis.contant';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ReqOnline } from './dto/req-online.dto';
import { ResOnlineDto } from './dto/res-online.dto';

@Injectable()
export class OnlineService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  // /* 查询在线用户 */
  async online({
    ipaddr = '',
    userName = '',
  }: ReqOnline): Promise<PaginatedDto<ResOnlineDto>> {
    const tokenKeyArr = await this.redis.keys(`${USER_TOKEN_KEY}:*`);
    const primiseArr = tokenKeyArr.map(async (item) => {
      const onlineKey = USER_ONLINE_KEY + item.replace(USER_TOKEN_KEY, '');
      return JSON.parse(await this.redis.get(onlineKey));
    });
    const allOnline: ResOnlineDto[] = await Promise.all(primiseArr);
    const rows = allOnline.filter((item) => {
      if (!item) return false;
      return item.ipaddr.includes(ipaddr) && item.userName.includes(userName);
    });
    return {
      rows,
      total: rows.length,
    };
  }

  /* 强退用户 */
  async deletOnline(tokenKey: string) {
    await this.redis.del(tokenKey);
  }
}
