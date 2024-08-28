import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { User } from '../entities/user.entity';

/* 分页查询用户 */
export class ReqUserListDto extends PaginationDto {
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  phonenumber?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type()
  @IsNumber()
  deptId?: number;

  @IsOptional()
  @IsObject()
  params: ParamsDto;
}

/* 新增用户 */
export class ReqAddUserDto extends OmitType(User, ['userId'] as const) {
  /* 部门Id */
  @IsOptional()
  @Type()
  @IsNumber()
  deptId?: number;

  /* 岗位id数组 */
  @IsArray()
  postIds: number[];

  /* 角色Id数组 */
  @IsArray()
  roleIds: number[];
}

/* 编辑用户 */
export class ReqUpdateUserDto extends OmitType(User, ['password'] as const) {
  /* 部门Id */
  @IsOptional()
  @Type()
  @IsNumber()
  deptId?: number;

  /* 岗位id数组 */
  @IsArray()
  postIds: number[];

  /* 角色Id数组 */
  @IsArray()
  roleIds: number[];
}

/* 更改密码 */
export class ReqResetPwdDto {
  /* 用户ID */
  @IsNumber()
  userId: number;

  /* 新密码 */
  @IsString()
  password: string;
}

/* 给用户分配角色 */
export class ReqUpdateAuthRoleDto {
  /* 用户id */
  @Type()
  @IsNumber()
  userId: number;

  /* 角色Id数组 */
  @IsString()
  roleIds: string;
}

/* 更改用户状态 */
export class ReqChangeStatusDto {
  /* 用户id */
  @Type()
  @IsNumber()
  userId: number;

  /* 状态 */
  @Type()
  @IsString()
  status: string;
}

/* 更改自己的用户信息 */
export class ReqUpdataSelfDto {
  /* 昵称 */
  @IsString()
  nickName?: string;

  /* 手机号码 */
  @IsString()
  phonenumber?: string;

  /* 邮箱 */
  @IsString()
  email?: string;

  /* 用户性别（0男 1女 2未知） */
  @IsOptional()
  @IsString()
  sex?: string;

  @ApiHideProperty()
  avatar: string;
}

/* 更改自己的用户信息 */
export class ReqUpdateSelfPwd {
  /* 旧密码 */
  @IsString()
  oldPassword: string;

  /* 旧密码 */
  @IsString()
  newPassword: string;
}
