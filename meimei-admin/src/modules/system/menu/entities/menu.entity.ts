import { ApiHideProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Allow, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { Role } from "../../role/entities/role.entity";
@Entity()
@Tree('materialized-path')
export class Menu extends BaseEntity {
    /* 菜单ID */
    @PrimaryGeneratedColumn({
        name: 'menu_id',
        comment: '菜单ID',
        type: 'int'
    })
    @Type()
    @IsNumber()
    menuId: number

    /* 菜单名称 */
    @Column({
        name: "menu_name",
        comment: '菜单名称',
        length: 50
    })
    @IsString()
    menuName: string

    /* 显示顺序 */
    @Column({
        name: "order_num",
        comment: '显示顺序',
    })
    @IsNumber()
    orderNum: number

    /* 路由地址 */
    @Column({
        name: "path",
        comment: '路由地址',
        length: 200,
        default: ''
    })
    @IsOptional()
    @IsString()
    path: string

    /* 组件路径 */
    @Column({
        name: "component",
        comment: '组件路径',
        length: 255,
        default: null
    })
    @IsOptional()
    @IsString()
    component?: string

    /* 路由参数 */
    @Column({
        name: "query",
        comment: '路由参数',
        length: 255,
        default: null
    })
    @IsOptional()
    @IsString()
    query?: string

    /* 是否为外链 */
    @Column({
        name: "is_frame",
        comment: '是否为外链（0是 1否）',
        type: 'int',
        default: 1
    })
    @IsOptional()
    @Type()
    @IsNumber()
    isFrame: number

    /* 是否缓存 */
    @Column({
        name: "is_cache",
        comment: '是否缓存（0缓存 1不缓存）',
        type: 'int',
        default: 0
    })
    @IsOptional()
    @Type()
    @IsNumber()
    isCache?: number

    /* '菜单类型 */
    @Column({
        name: "menu_type",
        comment: '菜单类型（M目录 C菜单 F按钮）',
        length: 1,
        type: 'char',
        default: ''
    })
    @IsString()
    menuType: string


    /* 菜单状态(0显示 1隐藏) */
    @Column({
        name: "visible",
        comment: '菜单状态（0显示 1隐藏）',
        length: 1,
        type: 'char',
        default: '0'
    })
    @IsOptional()
    @IsString()
    visible?: string

    /* 菜单状态（0正常 1停用） */
    @Column({
        name: "status",
        comment: '菜单状态（0正常 1停用）',
        length: 1,
        type: 'char',
        default: '0'
    })
    @IsOptional()
    @IsString()
    status?: string

    /* 权限标识 */
    @Column({
        name: "perms",
        comment: '权限标识',
        length: 100,
        default: null
    })
    @IsOptional()
    @IsString()
    perms?: string

    /* 菜单图标 */
    @Column({
        name: "icon",
        comment: '菜单图标',
        length: 100,
        type: 'char',
        default: '#'
    })
    @IsOptional()
    @IsString()
    icon?: string

    @ApiHideProperty()
    @TreeChildren()
    children: Menu[]

    @ApiHideProperty()
    @TreeParent()
    parent: Menu

    @ApiHideProperty()
    @ManyToMany(() => Role, role => role.menus)
    roles: Role[]
}