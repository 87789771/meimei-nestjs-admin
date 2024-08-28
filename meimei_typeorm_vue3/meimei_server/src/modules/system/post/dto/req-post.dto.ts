import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Post } from '../entities/post.entity';

/* 新增岗位 */
export class ReqAddPostDto extends OmitType(Post, ['postId'] as const) {}

/* 分页查询 */
export class ReqPostListDto extends PaginationDto {
  /* 岗位编码 */
  @IsOptional()
  @IsString()
  postCode?: string;

  /* 岗位名称 */
  @IsOptional()
  @IsString()
  postName?: string;

  /* 状态 */
  @IsOptional()
  @IsString()
  status?: string;
}
