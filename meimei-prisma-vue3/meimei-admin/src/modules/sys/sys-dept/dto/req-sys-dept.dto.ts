import { IsNumber, IsOptional, IsString } from 'class-validator';
import { DataBaseDto } from 'src/common/dto/data-base.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

/* 分页查询 */
export class GetSysDeptListDto extends PaginationDto {
  /* 部门名称 */
  @IsOptional()
  @IsString()
  deptName?: string;

  /* 状态 */
  @IsOptional()
  @IsString()
  status?: string;
}

/* 新增 */
export class AddSysDeptDto extends DataBaseDto {
  /* 部门名称 */
  @IsString()
  deptName: string;

  /* 上级部门ID */
  @IsNumber()
  parentId: number;

  /*显示顺序  */
  @IsNumber()
  orderNum: number;

  /* 负责人 */
  @IsOptional()
  @IsString()
  leader?: string;

  /* 联系电话 */
  @IsOptional()
  @IsString()
  phone?: string;

  /* 邮箱 */
  @IsOptional()
  @IsString()
  email?: string;

  /* 部门状态 */
  @IsString()
  status: string;

  ancestors: string;
}

/* 编辑 */
export class UpdateSysDeptDto extends AddSysDeptDto {
  @IsNumber()
  deptId: number;
}
