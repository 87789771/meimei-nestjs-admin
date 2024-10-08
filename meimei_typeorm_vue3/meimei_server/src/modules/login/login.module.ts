import { Module } from '@nestjs/common'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../system/auth/auth.constants'
import { AuthModule } from '../system/auth/auth.module'
import { UserModule } from '../system/user/user.module'
import { MenuModule } from '../system/menu/menu.module'
import { LogModule } from '../monitor/log/log.module'

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '168h' },
    }),
    AuthModule,
    UserModule,
    MenuModule,
    LogModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
