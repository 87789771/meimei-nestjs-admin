/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-23 18:59:25
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-04-24 10:01:32
 * @FilePath: \meimei-new\src\modules\login\login.module.ts
 * @Description: 登录模块
 *
 */
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { jwtConstants } from '../auth/auth.constants';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const expiresIn = configService.get('expiresIn') || 60 * 60 * 24 * 7;
        return {
          secret: jwtConstants.secret,
          signOptions: { expiresIn: expiresIn },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
