import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly ctxPrefix: string = LogInterceptor.name
  private readonly logger: Logger = new Logger(this.ctxPrefix)

  public intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
    return call$.handle().pipe(
      tap({
        next: (val: any): void => {
          this.logNext(val, context)
        },
        error: (err: Error): void => {
          this.logError(err, context)
        },
      }),
    )
  }

  private logNext(body: any, context: ExecutionContext): void {
    const req: Request = context.switchToHttp().getRequest<Request>()
    const res: Response = context.switchToHttp().getResponse<Response>()
    const { method, originalUrl, ip } = req
    const { statusCode } = res

    this.logger.log(`code: ${statusCode} | method: ${method} | path: ${originalUrl} | ip: ${ip}`)
  }

  private logError(error: Error, context: ExecutionContext): void {
    const req: Request = context.switchToHttp().getRequest<Request>()
    const { method, originalUrl, ip } = req

    if (error instanceof HttpException) {
      const statusCode: number = error.getStatus()
      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(`code: ${statusCode} | method: ${method} | path: ${originalUrl} | ip: ${ip}`)
      } else {
        this.logger.warn(`code: ${statusCode} | method: ${method} | path: ${originalUrl} | ip: ${ip}`)
      }
    } else {
      this.logger.error(`code: ${error.message} | method: ${method} | path: ${originalUrl} | ip: ${ip}`)
    }
  }
}
