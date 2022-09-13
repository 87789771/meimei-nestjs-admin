import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dept } from '../../dept/entities/dept.entity';
import { Menu } from '../../menu/entities/menu.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Role extends BaseEntity {
  /* 角色ID */
  @PrimaryGeneratedColumn({
    name: 'role_id',
    comment: '角色ID',
    type: 'int',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: '角色ID',
  })
  roleId: number;

  /* 角色名称 */
  @Column({
    name: 'role_name',
    comment: '角色名称',
    length: 30,
  })
  @IsString()
  @Excel({
    name: '角色名称',
  })
  roleName: string;

  /* 角色权限字符串 */
  @Column({
    name: 'role_key',
    comment: '角色权限字符串',
    length: 100,
  })
  @IsString()
  @Excel({
    name: '角色权限字符串',
  })
  roleKey: string;

  /* 显示顺序 */
  @Column({
    name: 'role_sort',
    comment: '显示顺序',
  })
  @IsNumber()
  @Excel({
    name: '显示顺序',
  })
  roleSort: number;

  /* 数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限  5：仅本人数据权限） */
  @Column({
    name: 'data_scope',
    comment:
      '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限 5：仅本人数据权限）',
    length: 1,
    type: 'char',
    default: '1',
  })
  @IsOptional()
  @IsString()
  dataScope?: string;

  /* 菜单树选择项是否关联显示 */
  @Column({
    name: 'menu_check_strictly',
    comment: '菜单树选择项是否关联显示',
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  menuCheckStrictly: boolean;

  /* 菜单树选择项是否关联显示 */
  @Column({
    name: 'dept_check_strictly',
    comment: '菜单树选择项是否关联显示',
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  deptCheckStrictly: boolean;

  /* 角色状态（0正常 1停用） */
  @Column({
    name: 'status',
    comment: '角色状态（0正常 1停用）',
    length: 1,
    type: 'char',
  })
  @IsString()
  @Excel({
    name: '角色状态',
    dictType: 'sys_normal_disable',
  })
  status: string;

  @Column({
    name: 'del_flag',
    comment: '删除标志（0代表存在 2代表删除）',
    length: 1,
    type: 'char',
    default: '0',
  })
  @ApiHideProperty()
  delFlag: string;

  @ApiHideProperty()
  @ManyToMany(() => Dept, (dept) => dept.roles)
  @JoinTable()
  depts: Dept[];

  @ApiHideProperty()
  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable()
  menus: Menu[];

  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
