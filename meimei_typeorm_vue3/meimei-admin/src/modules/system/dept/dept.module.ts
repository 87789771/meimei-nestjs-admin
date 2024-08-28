import { DeptController } from './dept.controller';
import { DeptService } from './dept.service';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dept } from './entities/dept.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dept]), forwardRef(() => RoleModule)],
  controllers: [DeptController],
  providers: [DeptService],
  exports: [DeptService],
})
export class DeptModule {}
