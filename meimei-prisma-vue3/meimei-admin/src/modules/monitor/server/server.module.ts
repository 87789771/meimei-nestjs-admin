import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
