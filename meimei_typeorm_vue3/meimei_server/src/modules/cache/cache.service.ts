import { Injectable, Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
  public INSTANCE: Cache

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.INSTANCE = this.cacheManager
  }
}
