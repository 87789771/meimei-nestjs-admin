/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-23 18:59:25
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-11-07 11:31:42
 * @FilePath: \meimei-prisma-vue3\meimei-admin\src\modules\login\login.module.ts
 * @Description: 登录模块
 *
 */
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { jwtConstants } from '../auth/auth.constants';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        const expiresIn = 60 * 60 * 24 * 365;  //redis来管控账号是否过期，jwt设置过期为一年
        return {
          secret: jwtConstants.secret,
          signOptions: { expiresIn: expiresIn },
        };
      },
    }),
    AuthModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
