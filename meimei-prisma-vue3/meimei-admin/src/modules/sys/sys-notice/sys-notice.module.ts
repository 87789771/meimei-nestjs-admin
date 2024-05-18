import { Module } from '@nestjs/common';
import { SysNoticeController } from './sys-notice.controller';
import { SysNoticeService } from './sys-notice.service';

@Module({
  controllers: [SysNoticeController],
  providers: [SysNoticeService]
})
export class SysNoticeModule {}
