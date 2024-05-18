/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-13 16:22:47
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-14 08:57:07
 * @FilePath: \meimei-new\src\modules\sys\sys-role\dto\req-sys-role.dto.ts
 * @Description:
 *
 */
import { OmitType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { DataBaseDto } from 'src/common/dto/data-base.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { transformDate } from 'src/common/func/transform-date.func';
import { Excel } from 'src/modules/common/excel/excel.decorator';

/* 分页查询 */
export class GetSysRoleListDto extends PaginationDto {
  @IsOptional()
  @IsString()
  roleName?: string;

  @IsOptional()
  @IsString()
  roleKey?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  @Transform(({ value }) => transformDate(value))
  params: ParamsDto = {};
}

/* 新增 */
export class AddSysRoleDto extends DataBaseDto {
  /* 角色名称 */
  @IsString()
  @Excel({
    name: '角色名称',
  })
  roleName: string;

  /* 角色权限字符串 */
  @IsString()
  @Excel({
    name: '角色权限字符串',
  })
  roleKey: string;

  /* 显示顺序 */
  @IsNumber()
  @Excel({
    name: '显示顺序',
  })
  roleSort: number;

  /* 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限  5：仅本人数据权限） */
  @IsOptional()
  @IsString()
  dataScope?: string;

  /* 菜单树选择项是否关联显示 */
  @IsBoolean()
  menuCheckStrictly: boolean;

  /* 菜单树选择项是否关联显示 */
  @IsBoolean()
  deptCheckStrictly: boolean;

  /* 角色状态（0正常 1停用） */
  @IsString()
  @Excel({
    name: '角色状态',
    dictType: 'sys_normal_disable',
  })
  status: string;

  /* 菜单id数组 */
  @IsArray()
  menuIds: number[];
}

/* 编辑 */
export class UpdateSysRoleDto extends AddSysRoleDto {
  @IsNumber()
  roleId: number;
}

/* 编辑数据权限 */
export class DataScopeDto extends OmitType(UpdateSysRoleDto, [
  'menuIds',
] as const) {
  /* 部门id数组 */
  @IsArray()
  deptIds: number[];
}

/* 改变角色状态 */
export class ChangeStatusDto {
  /* 角色id */

  @IsNumber()
  roleId: number;

  /* 状态值 */

  @IsString()
  status: string;
}

/* 分页查询角色下用户/ 不在角色下用户 */
export class AllocatedListDto extends PaginationDto {
  /* 角色Id */

  @IsNumber()
  @Type()
  roleId: number;

  /* 用户名 */
  @IsOptional()
  @IsString()
  userName?: string;

  /* 手机号 */
  @IsOptional()
  @IsString()
  phonenumber?: string;
}

/* 单个取消用户角色授权 */
export class CancelDto {
  /* 角色ID */
  @IsNumber()
  @Type()
  roleId: number;

  /* 用户ID */
  @IsNumber()
  userId: number;
}

/* 批量 取消/授权 用户角色授权 */
export class CancelAllDto {
  /* 角色Id */
  @IsNumber()
  @Type()
  roleId: number;

  /* 用户角色字符串拼接如 1,2,3 */
  @IsString()
  userIds: string;
}
