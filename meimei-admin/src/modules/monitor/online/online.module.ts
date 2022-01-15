import { OnlineController } from './online.controller';
import { OnlineService } from './online.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ReqOnline } from './dto/req-online.dto';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ResOnlineDto } from './dto/res-online.dto';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { USER_ONLINE_KEY, USER_TOKEN_KEY } from 'src/common/contants/redis.contant';

@Module({
    imports: [],
    controllers: [
        OnlineController,],
    providers: [
        OnlineService,],
})
export class OnlineModule {
    constructor(
        @InjectRedis() private readonly redis: Redis,
    ) { }
    /* 查询在线用户 */
    async online({ ipaddr = '', userName = '' }: ReqOnline): Promise<PaginatedDto<ResOnlineDto>> {
        const tokenKeyArr = await this.redis.keys(`${USER_TOKEN_KEY}:*`)
        const primiseArr = tokenKeyArr.map(async item => {
            const onlineKey = USER_ONLINE_KEY + item.replace(USER_TOKEN_KEY, '')
            return JSON.parse(await this.redis.get(onlineKey))
        })
        const allOnline: ResOnlineDto[] = await Promise.all(primiseArr);
        let rows = allOnline.filter((item) => {
            if (!item) return false
            return item.ipaddr.includes(ipaddr) && item.userName.includes(userName)
        })
        return {
            rows,
            total: rows.length
        }
    }

    /* 强退用户 */
    async deletOnline(tokenKey: string) {
        await this.redis.del(tokenKey)
    }
}
