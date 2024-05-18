import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ReqLoginDto } from 'src/modules/login/dto/req-login.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true, //设置回调函数第一个参数为 request
    });
  }

  async validate(request, username: string, password: string): Promise<any> {
    const body: ReqLoginDto = request.body; // 获取请求体
    await this.authService.checkImgCaptcha(body.uuid, body.code);
    const user = await this.authService.validateUser(username, password);
    //返回值会被守卫的handleRequest方法获取
    return user;
  }
}
