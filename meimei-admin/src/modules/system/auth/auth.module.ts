/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:26:54
 * @LastEditTime: 2021-12-09 15:14:08
 * @LastEditors: Sheng.Jiang
 * @Description: 身份认证模块
 * @FilePath: \meimei\src\modules\system\auth\auth.module.ts
 * You can you up，no can no bb！！
 */


import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
    ],
    controllers: [],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
