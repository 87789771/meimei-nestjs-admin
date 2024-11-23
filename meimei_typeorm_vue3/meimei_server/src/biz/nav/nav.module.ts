import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NavController } from './nav.controller'
import { NavService } from './nav.service'
import { Category, Website } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Website])],
  controllers: [NavController],
  providers: [NavService],
})
export class NavModule {}
