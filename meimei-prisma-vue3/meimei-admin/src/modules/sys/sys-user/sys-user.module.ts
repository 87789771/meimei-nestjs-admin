import { Module } from '@nestjs/common';
import { SysUserController } from './sys-user.controller';
import { SysUserService } from './sys-user.service';
import { UploadModule } from 'src/modules/common/upload/upload.module';
import { LoginModule } from 'src/modules/login/login.module';

@Module({
  imports: [UploadModule, LoginModule],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
