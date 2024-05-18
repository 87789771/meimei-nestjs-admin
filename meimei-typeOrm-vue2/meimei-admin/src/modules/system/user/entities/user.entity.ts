import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { ExcelTypeEnum } from 'src/modules/common/excel/excel.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dept } from '../../dept/entities/dept.entity';
import { Post } from '../../post/entities/post.entity';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  /* 用户Id */
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: '用户ID',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: '用户Id',
    type: ExcelTypeEnum.EXPORT,
  })
  userId: number;

  /* 用户账号 */
  @Column({
    name: 'user_name',
    comment: '用户账号',
    length: 30,
  })
  @IsString()
  @Excel({
    name: '用户账号',
  })
  userName: string;

  /* 用户昵称 */
  @Column({
    name: 'nick_name',
    comment: '用户昵称',
    length: 30,
  })
  @IsString()
  @Excel({
    name: '用户昵称',
  })
  nickName: string;

  /* 用户类型 */
  @Column({
    name: 'user_type',
    comment: '用户类型（00系统用户）',
    length: 2,
    default: '00',
  })
  @IsOptional()
  @IsString()
  userType?: string;

  /* 用户邮箱 */
  @Column({
    comment: '用户邮箱',
    length: 50,
    default: null,
  })
  @IsOptional()
  @IsString()
  email?: string;

  /* 手机号码 */
  @Column({
    comment: '手机号码',
    length: 11,
    default: null,
  })
  @IsOptional()
  @IsString()
  @Excel({
    name: '手机号码',
  })
  phonenumber?: string;

  @Column({
    comment: '用户性别（0男 1女 2未知）',
    type: 'char',
    length: 1,
    default: '0',
  })
  @IsOptional()
  @IsString()
  sex: string;

  /* 头像地址 */
  @Column({
    comment: '头像地址',
    length: 100,
    default: '',
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  /* 密码 */
  @Column({
    comment: '密码',
    length: 100,
    default: '',
    select: false,
  })
  @Excel({
    type: ExcelTypeEnum.IMPORT,
    name: '密码',
  })
  @IsString()
  password: string;

  @ApiHideProperty()
  @Column({
    comment: '盐加密',
    length: 100,
    default: '',
    select: false,
  })
  salt: string;

  /* 帐号状态 */
  @Column({
    comment: '帐号状态（0正常 1停用）',
    type: 'char',
    length: 1,
    default: '0',
  })
  @IsString()
  @IsString()
  @Excel({
    name: '帐号状态',
    dictType: 'sys_normal_disable',
  })
  status: string;

  @ApiHideProperty()
  @Column({
    name: 'del_flag',
    comment: '删除标志（0代表存在 2代表删除）',
    type: 'char',
    length: 1,
    default: '0',
  })
  delFlag: string;

  /* 最后登录IP */
  @Column({
    name: 'login_ip',
    comment: '最后登录IP',
    length: 128,
    default: '',
  })
  @IsOptional()
  @IsString()
  loginIp?: string;

  /* 最后登录时间 */
  @Column({
    name: 'login_date',
    comment: '最后登录时间',
    default: null,
  })
  @IsOptional()
  @IsString()
  loginDate?: Date;

  @ApiHideProperty()
  @ManyToOne(() => Dept, (dept) => dept.users)
  dept: Dept;

  @ApiHideProperty()
  @ManyToMany(() => Post, (post) => post.users)
  @JoinTable()
  posts: Post[];

  @ApiHideProperty()
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
