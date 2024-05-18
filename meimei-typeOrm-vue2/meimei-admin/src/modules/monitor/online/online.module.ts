import { OnlineController } from './online.controller';
import { OnlineService } from './online.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [OnlineController],
  providers: [OnlineService],
})
export class OnlineModule {}
