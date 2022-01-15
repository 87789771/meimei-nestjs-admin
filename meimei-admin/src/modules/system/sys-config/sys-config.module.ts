import { SysConfigService } from './sys-config.service';
import { SysConfigController } from './sys-config.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysConfig } from './entities/sys-config.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SysConfig])],
    controllers: [
        SysConfigController,],
    providers: [
        SysConfigService,],
})
export class SysConfigModule { }
