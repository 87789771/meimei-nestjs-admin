import { ServerService } from './server.service';
import { ServerController } from './server.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
