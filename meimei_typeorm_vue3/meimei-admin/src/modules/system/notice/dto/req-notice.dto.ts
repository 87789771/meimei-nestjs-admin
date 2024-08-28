import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Notice } from '../entities/notice.entity';

export class ReqAddNoticeDto extends OmitType(Notice, ['noticeId'] as const) {}

export class ReqNoeiceList extends PaginationDto {
  /* 广告标题 */
  @IsOptional()
  @IsString()
  noticeTitle: string;

  /* 创建人 */
  @IsOptional()
  @IsString()
  createBy: string;

  /* 公告类型 */
  @IsOptional()
  @IsString()
  noticeType: string;
}
