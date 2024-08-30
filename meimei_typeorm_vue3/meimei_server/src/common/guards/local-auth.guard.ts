import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { ApiException } from '../exceptions/api.exception'
import { LogService } from 'src/modules/monitor/log/log.service'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly logService: LogService) {
    super()
  }
  context: ExecutionContext
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    this.context = context
    return super.canActivate(context)
  }

  /* 主动处理错误,进行日志记录 */
  handleRequest(err, user, info) {
    if (err || !user) {
      const request = this.context.switchToHttp().getRequest()
      request.user = user
      this.logService.addLogininfor(request, err.response)
      throw err || new ApiException(err)
    }
    return user
  }
}
