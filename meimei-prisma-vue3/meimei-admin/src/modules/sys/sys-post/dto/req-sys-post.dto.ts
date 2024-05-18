import { IsNumber, IsOptional, IsString } from 'class-validator';
import { DataBaseDto } from 'src/common/dto/data-base.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Excel } from 'src/modules/common/excel/excel.decorator';

/* 分页查询 */
export class GetSysPostListDto extends PaginationDto {
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

/* 新增 */
export class AddSysPostDto extends DataBaseDto {
  /* 岗位编码 */
  @IsString()
  @Excel({
    name: '岗位编码',
  })
  postCode: string;

  /* 岗位名称 */
  @IsString()
  @Excel({
    name: '岗位名称',
  })
  postName: string;

  /* 显示顺序 */
  @IsNumber()
  @Excel({
    name: '显示顺序',
  })
  postSort: number;

  /* 状态（0正常 1停用 */
  @IsString()
  @Excel({
    name: '状态',
    dictType: 'sys_normal_disable',
  })
  status: string;
}

/* 编辑 */
export class UpdateSysPostDto extends AddSysPostDto {
  @IsNumber()
  postId: number;
}
