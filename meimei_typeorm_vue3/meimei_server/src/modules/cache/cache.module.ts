import { Module, Global } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import type { CacheModuleOptions } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'
import type { RedisClientOptions } from 'redis'

import * as kiwi from 'src/kiwi'
import { CacheService } from './cache.service'

const cacheModuleOptions: CacheModuleOptions = {
  store: 'memory',
  // ttl: 5,
  // max: 100,
  isGlobal: true,
}

if (kiwi.env.isUsingRedis) {
  Object.assign(cacheModuleOptions, {
    store: redisStore,
    host: kiwi.env.redisHost,
    port: kiwi.env.redisPort,
    auth_pass: kiwi.env.redisPassword,
    db: kiwi.env.redisDb,
  })
}

@Global()
@Module({
  imports: [CacheModule.register<RedisClientOptions>(cacheModuleOptions)],
  providers: [CacheService],
  exports: [CacheService],
})
export class AppCacheModule {}
