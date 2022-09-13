import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { MenuModule } from '../menu/menu.module';
import { DeptModule } from '../dept/dept.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => MenuModule),
    forwardRef(() => DeptModule),
    forwardRef(() => UserModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
