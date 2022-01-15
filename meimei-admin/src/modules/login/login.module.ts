/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:29:45
 * @LastEditTime: 2021-12-24 13:20:01
 * @LastEditors: Sheng.Jiang
 * @Description: 登录模块
 * @FilePath: \meimei\src\modules\login\login.module.ts
 * You can you up，no can no bb！！
 */


import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../system/auth/auth.constants';
import { AuthModule } from '../system/auth/auth.module';
import { UserModule } from '../system/user/user.module';
import { MenuModule } from '../system/menu/menu.module';
import { LogModule } from '../monitor/log/log.module';

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' },
        }),
        AuthModule,
        UserModule,
        MenuModule,
        LogModule
    ],
    controllers: [
        LoginController,],
    providers: [
        LoginService,],
})
export class LoginModule { }
