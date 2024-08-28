import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
