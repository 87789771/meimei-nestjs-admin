/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-17 11:07:14
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2025-05-31 11:05:03
 * @FilePath: /meimei-admin/src/modules/monitor/cache/cache.service.ts
 * @Description:
 *
 */
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { cacheList } from 'src/common/contants/redis.contant';
import { parse } from 'redis-info';

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async getNames() {
    return cacheList;
  }

  async getKeys(cacheName: string) {
    return await this.redis.keys(`${cacheName}:*`);
  }

  async getValue(cacheName: string, cacheKey: string) {
    // 根据key的类型来判断使用哪种方法读取值
    let cacheValue = undefined;
    const keyType = await this.redis.type(cacheKey);

    switch (keyType) {
      case 'hash':
        // hash类型使用hgetall读取
        const obj = await this.redis.hgetall(cacheKey);
        cacheValue = JSON.stringify(obj);
        break;
      case 'set':
        // set类型使用smembers读取
        cacheValue = await this.redis.smembers(cacheKey);
        break;
      case 'string':
        // string类型使用get读取
        cacheValue = await this.redis.get(cacheKey);
        break;
      default:
        cacheValue = null;
    }

    return { cacheValue, cacheName, cacheKey };
  }

  async clearCacheName(cacheName: string) {
    const keys = await this.getKeys(cacheName);
    await this.redis.del(keys);
  }

  async clearCacheKey(key: string) {
    await this.redis.del(key);
  }

  async clearCacheAll() {
    const cacheList = await this.getNames();
    const prismaArr = cacheList.map((item) => {
      return this.clearCacheName(item.cacheName);
    });
    return await Promise.all(prismaArr);
  }

  /* 获取redis信息 */
  async getRedisInfo() {
    const info = await this.redis.info();
    const redisIfo = parse(info);
    const dbSize = (await this.redis.keys('*')).length;
    return {
      dbSize,
      commandStats: [
        {
          name: '缓存命中成功',
          value: redisIfo.keyspace_hits,
        },
        {
          name: '缓存命中失败',
          value: redisIfo.keyspace_misses,
        },
      ],
      info: redisIfo,
    };
  }
}
