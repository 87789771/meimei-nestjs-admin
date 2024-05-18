import { IsNumber, IsOptional, IsString } from 'class-validator';
import { DataBaseDto } from 'src/common/dto/data-base.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

/* 分页查询 */
export class GetSysMenuListDto extends PaginationDto {
  /* 菜单名称 */
  @IsOptional()
  @IsString()
  menuName?: string;

  /* 状态 */
  @IsOptional()
  @IsString()
  status?: string;
}

/* 新增 */
export class AddSysMenuDto extends DataBaseDto {
  /* 菜单名称 */
  @IsString()
  menuName: string;

  /* 上级菜单ID */
  @IsNumber()
  parentId?: number;

  /* 显示顺序 */
  @IsNumber()
  orderNum: number;

  /* 路由地址 */
  @IsOptional()
  @IsString()
  path?: string;

  /* 组件路径 */
  @IsOptional()
  @IsString()
  component?: string;

  /* 路由参数 */
  @IsOptional()
  @IsString()
  query?: string;

  /* 是否为外链 */
  @IsOptional()
  @IsString()
  isFrame?: string;

  /* 是否缓存 */
  @IsOptional()
  @IsString()
  isCache?: string;

  /* '菜单类型 */
  @IsString()
  menuType: string;

  /* 菜单状态(0显示 1隐藏) */
  @IsOptional()
  @IsString()
  visible?: string;

  /* 菜单状态（0正常 1停用） */
  @IsOptional()
  @IsString()
  status?: string;

  /* 权限标识 */
  @IsOptional()
  @IsString()
  perms?: string;

  /* 菜单图标 */
  @IsOptional()
  @IsString()
  icon?: string;
}

/* 编辑 */
export class UpdateSysMenuDto extends AddSysMenuDto {
  @IsNumber()
  menuId: number;
}
