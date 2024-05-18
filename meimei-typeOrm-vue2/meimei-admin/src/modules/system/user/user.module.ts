import { UserController } from './user.controller';
import { UserService } from './user.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { PostModule } from '../post/post.module';
import { DeptModule } from '../dept/dept.module';
import { storage } from 'src/modules/common/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => RoleModule),
    PostModule,
    DeptModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          storage: storage(configService.get('uploadPath')),
          preservePath: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
