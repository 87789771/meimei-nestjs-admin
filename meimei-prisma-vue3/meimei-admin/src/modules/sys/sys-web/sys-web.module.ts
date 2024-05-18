import { Module } from '@nestjs/common';
import { SysWebController } from './sys-web.controller';
import { SysWebService } from './sys-web.service';

@Module({
  controllers: [SysWebController],
  providers: [SysWebService]
})
export class SysWebModule {}
