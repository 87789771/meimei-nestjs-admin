import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { ApiException } from '../exceptions/api.exception'

import * as kiwi from 'src/kiwi'

@Injectable()
export class DemoEnvironmentGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isDemoEnvironment = kiwi.env.isDemoEnv
    if (!isDemoEnvironment) return true
    const request: Request = context.switchToHttp().getRequest()
    const allowUrlArr = [`${kiwi.env.apiGlobalPrefix}/login`, `${kiwi.env.apiGlobalPrefix}/logout`] //放过的路由
    if (request.method.toLocaleLowerCase() != 'get' && !allowUrlArr.includes(request.url))
      throw new ApiException('演示环境,不允许操作')
    return true
  }
}
