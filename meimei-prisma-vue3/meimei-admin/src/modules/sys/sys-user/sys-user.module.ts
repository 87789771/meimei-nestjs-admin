import { Module } from '@nestjs/common';
import { SysUserController } from './sys-user.controller';
import { SysUserService } from './sys-user.service';
import { UploadModule } from 'src/modules/common/upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [SysUserController],
  providers: [SysUserService],
})
export class SysUserModule {}
