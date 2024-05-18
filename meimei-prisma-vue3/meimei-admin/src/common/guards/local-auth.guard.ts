/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-09 14:30:28
 * @LastEditTime: 2024-05-12 16:53:25
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @Description: 登录守卫 ，可进行登录日志记录
 * @FilePath: /meimei-new/src/common/guards/local-auth.guard.ts
 * You can you up，no can no bb！！
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiException } from '../exceptions/api.exception';
import { LoginInforService } from 'src/modules/monitor/login-infor/login-infor.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly loginInforService: LoginInforService) {
    super();
  }
  context: ExecutionContext;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.context = context;
    return super.canActivate(context);
  }

  /* 主动处理错误 */
  handleRequest(err, user, info) {
    if (err || !user) {
      const request = this.context.switchToHttp().getRequest();
      this.loginInforService.addLoginInfor(request, err.response, '1');
      throw err || new ApiException('用户名或密码错误');
    }
    // 返回值会被挂载到request的user上
    return user;
  }
}
