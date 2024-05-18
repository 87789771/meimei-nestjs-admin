/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:30:39
 * @LastEditTime: 2024-05-17 17:08:30
 * @LastEditors: JiangSheng 87789771@qq.com
 * @Description: 登录 controller
 * @FilePath: \meimei-new\src\modules\login\login.controller.ts
 * You can you up，no can no bb！！
 */

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
  Req,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { ReqLoginDto } from './dto/req-login.dto';
import { ResImageCaptchaDto, ResLoginDto } from './dto/res-login.dto';
import { LoginService } from './login.service';
import { SysUser } from '@prisma/client';
import { Request } from 'express';
import { UserInfo } from 'src/common/type/user-info.type';
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /* 获取图片验证码 */
  @Get('captchaImage')
  @Public()
  async captchaImage(): Promise<ResImageCaptchaDto> {
    return await this.loginService.createImageCaptcha();
  }

  /* 用户登录 */
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() reqLoginDto: ReqLoginDto,
    @User() user: SysUser,
    @Req() req: Request,
  ): Promise<ResLoginDto> {
    return await this.loginService.login(user, req);
  }

  /* 获取用户信息 */
  @Get('getInfo')
  async getInfo(@User() user: UserInfo) {
    const { permissions, roles } = user;
    const roleKeys = roles.map((item) => item.roleKey);
    delete user.permissions;
    return {
      user,
      permissions,
      roles: roleKeys,
    };
  }

  /* 获取用户路由信息 */
  @Get('getRouters')
  async getRouters(
    @User(UserEnum.userId) userId: number,
    @User(UserEnum.permissions) permissions: string[],
  ) {
    return await this.loginService.getRouters(userId, permissions);
  }

  /* 退出登录 */
  @Public()
  @Post('logout')
  async logout(@Headers('Authorization') authorization: string) {
    if (authorization) {
      const token = authorization.slice(7);
      await this.loginService.logout(token);
    }
  }
}
