import { OnlineController } from './online.controller';
import { OnlineService } from './online.service';
import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Module({
    imports: [],
    controllers: [
        OnlineController,],
    providers: [
        OnlineService,],
})
export class OnlineModule {}
