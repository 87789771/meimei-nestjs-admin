/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-13 16:22:47
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-15 17:02:32
 * @FilePath: \meimei-new\src\modules\sys\sys-user\dto\req-sys-user.dto.ts
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
import {
  ColumnTypeEnum,
  ExcelTypeEnum,
} from 'src/modules/common/excel/excel.enum';

/* 分页查询 */
export class GetSysUserListDto extends PaginationDto {
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
  @Transform(({ value }) => transformDate(value))
  params: ParamsDto = {};
}

/* 新增 */
export class AddSysUserDto extends DataBaseDto {
  /* 用户账号 */
  @IsString()
  @Excel({
    name: '用户账号',
  })
  userName: string;

  /* 用户昵称 */
  @IsString()
  @Excel({
    name: '用户昵称',
  })
  nickName: string;

  /* 用户类型 */
  @IsOptional()
  @IsString()
  userType?: string;

  /* 用户邮箱 */
  @IsOptional()
  @IsString()
  email?: string;

  /* 手机号码 */
  @IsOptional()
  @IsString()
  @Excel({
    name: '手机号码',
  })
  phonenumber?: string;

  @IsOptional()
  @IsString()
  sex: string;

  /* 密码 */
  @Excel({
    type: ExcelTypeEnum.IMPORT,
    name: '密码',
  })
  @IsString()
  password: string;

  /* 帐号状态 */
  @IsString()
  @IsString()
  @Excel({
    name: '帐号状态',
    dictType: 'sys_normal_disable',
  })
  status: string;

  /* 用户部门 */
  @IsNumber()
  @Type()
  deptId: number;

  /* 岗位id数组 */
  @IsArray()
  postIds: number[];

  /* 角色Id数组 */
  @IsArray()
  roleIds: number[];
}
/* 编辑 */
export class UpdateSysUserDto extends OmitType(AddSysUserDto, [
  'userName',
  'password',
] as const) {
  @IsNumber()
  userId: number;
}

/* 改变用户状态 */
export class ChangeStatusDto {
  /* 用户id */
  @IsNumber()
  userId: number;

  /* 状态值 */
  @IsString()
  status: string;
}

/* 更改自己的用户信息 */
export class UpdataSelfDto {
  /* 用户ID */
  userId?: number;

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

  @IsOptional()
  @IsString()
  avatar: string;
}

/* 更改自己密码 */
export class UpdateSelfPwd {
  /* 用户ID */
  userId?: number;
  
  /* 旧密码 */
  @IsString()
  oldPassword: string;

  /* 旧密码 */
  @IsString()
  newPassword: string;
}

/* 重置用户密码 */
export class ResetPwdDto {
  @IsNumber()
  userId: number;

  @IsString()
  password: string;
}

/* 批量 取消/授权 用户角色授权 */
export class CancelAllDto {
  /* 角色Id */
  @IsNumber()
  @Type()
  userId: number;

  /* 用户角色字符串拼接如 1,2,3 */
  @IsString()
  roleIds: string;
}

/* 导入模板 */
export class ImportSysUserDto {
  /* 用户昵称 */
  @IsString()
  @Excel({
    name: '用户昵称',
  })
  nickName: string;

  /* 用户账号 */
  @IsString()
  @Excel({
    name: '用户账号',
  })
  userName: string;

  /* 密码 */
  @Excel({
    name: '密码',
  })
  @IsString()
  password: string;

  /* 用户部门 */
  @Excel({
    name: '所属部门id',
    t: ColumnTypeEnum.number,
  })
  @IsNumber()
  @Type()
  deptId: number;

  createTime?: Date | string;
}

/* 导入 */
export class UpdateSupportDto {
  @IsBoolean()
  @Type()
  updateSupport: boolean;
}
