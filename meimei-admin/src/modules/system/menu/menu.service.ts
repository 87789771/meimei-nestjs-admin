/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeDataDto } from 'src/common/dto/tree-data.dto';
import { SharedService } from 'src/shared/shared.service';
import { FindConditions, getManager, In, Like, Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { ReqAddMenuDto, ReqMenuListDto, ReqUpdateMenu } from './dto/req-menu.dto';
import { Router } from './dto/res-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
        private readonly sharedService: SharedService,
        @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService
    ) { }

    /* 新增或编辑菜单 */
    async addOrUpdate(reqAddMenuDto: ReqAddMenuDto) {
        if (reqAddMenuDto.parentId) {
            const parentMenu = await this.findById(reqAddMenuDto.parentId)
            reqAddMenuDto.parent = parentMenu
        }
        await this.menuRepository.save(reqAddMenuDto)
    }

    /* 查询菜单列表 */
    async list(reqMenuListDto: ReqMenuListDto) {
        let where: FindConditions<Menu> = {}
        if (reqMenuListDto.menuName) {
            where.menuName = Like((`%${reqMenuListDto.menuName}%`))
        }
        if (reqMenuListDto.status) {
            where.status = reqMenuListDto.status
        }
        return await this.menuRepository.createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.createTime', 'createTime')
            .addSelect('menu.menuName', 'menuName')
            .addSelect('menu.orderNum', 'orderNum')
            .addSelect('menu.status', 'status')
            .addSelect('menu.perms', 'perms')
            .addSelect('menu.icon', 'icon')
            .addSelect('menu.component', 'component')
            .addSelect('menu.menuType', 'menuType')
            .addSelect("ifnull(menu.parentMenuId,0)", "parentId")
            .where(where)
            .orderBy('menu.orderNum', 'ASC')
            .addOrderBy('menu.createTime', 'ASC')
            .getRawMany()
    }

    /* 通过id查询 */
    async findById(menuId: number | string) {
        return this.menuRepository.findOne(menuId)
    }

    /* 通过id查询，返回原始数据 */
    async findRawById(menuId: number | string) {
        return await this.menuRepository.createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.createTime', 'createTime')
            .addSelect('menu.menuName', 'menuName')
            .addSelect('menu.orderNum', 'orderNum')
            .addSelect('menu.status', 'status')
            .addSelect('menu.perms', 'perms')
            .addSelect('menu.icon', 'icon')
            .addSelect('menu.component', 'component')
            .addSelect('menu.menuType', 'menuType')
            .addSelect('menu.isFrame', 'isFrame')
            .addSelect('menu.isCache', 'isCache')
            .addSelect('menu.visible', 'visible')
            .addSelect('menu.path', 'path')
            .addSelect('menu.query', 'query')
            .addSelect("ifnull(menu.parentMenuId,0)", "parentId")
            .andWhere("menu.menuId = :menuId", { menuId })
            .getRawOne()
    }

    /* 查询除自己(包括子类) 外的所有 */
    async outList(menuId: number | string) {
        return this.menuRepository.createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.createTime', 'createTime')
            .addSelect('menu.menuName', 'menuName')
            .addSelect('menu.orderNum', 'orderNum')
            .addSelect('menu.status', 'status')
            .addSelect('menu.perms', 'perms')
            .addSelect('menu.icon', 'icon')
            .addSelect('menu.component', 'component')
            .addSelect('menu.menuType', 'menuType')
            .addSelect("ifnull(menu.parentMenuId,0)", "parentId")
            .andWhere("concat('.',menu.mpath) not like :v", { v: '%.' + menuId + '.%' })
            .getRawMany()
    }

    /* 通过 parentId 查询其所有孩子 */
    async findChildsByParentId(parentId: string): Promise<Menu[]> {
        return this.menuRepository.createQueryBuilder('menu')
            .where("menu.parentmenuId = :parentId", { parentId })
            .getMany()
    }

    /* 删除菜单 */
    async delete(menuId: string) {
        return this.menuRepository.delete(menuId)
    }

    /* 通过Id数组查询 */
    async listByIdArr(menuIdArr: number[]) {
        return this.menuRepository.find({
            where: {
                menuId: In(menuIdArr)
            }
        })
    }

    /* 查询菜单树结构 */
    async treeselect(): Promise<TreeDataDto[]> {
        const menuArr = await this.menuRepository.createQueryBuilder('menu')
            .select('menu.menuId', 'id')
            .addSelect('menu.menuName', 'label')
            .addSelect('menu.parentmenuId', 'parentId')
            .getRawMany()
        return this.sharedService.handleTree(menuArr)
    }

    /* 获取角色的菜单权限列表 */
    async getCheckedKeys(roleId: number | string): Promise<number[]> {
        let menuArr = await this.menuRepository.createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.mpath', 'mpath')
            .innerJoin('menu.roles', 'role', "role.roleId = :roleId", { roleId })
            .where('role.delFlag = 0')
            .getRawMany()
        const { menuCheckStrictly } = await this.roleService.findById(roleId) //查看是否 父子联动
        if (menuCheckStrictly) {
            menuArr = menuArr.filter(menu => !menuArr.find(menuSub => menu.menuId !== menuSub.menuId && ('.' + menuSub.mpath).includes('.' + menu.menuId + '.')))
        }
        return menuArr.map(menu => menu.menuId)
    }

    /* 根据角色数组查询所有权限标识 */
    async getAllPermissionsByRoles(roleIdArr: number[]) {
        const menuList = await this.menuRepository
            .createQueryBuilder('menu')
            .select("menu.perms")
            .innerJoin("menu.roles", "role", "role.delFlag = 0")
            .where("menu.perms is not null")
            .andWhere(qb => {
                const subQuery = qb.subQuery()
                    .select('menu2.menu_id')
                    .from(Menu, 'menu2')
                    .where("menu2.status=1")
                    .andWhere("concat('.',menu.mpath) like concat('%.',menu2.menu_id,'.%')")
                    .getQuery()
                return "not exists" + subQuery
            })
            .andWhere("role.status = 0 and role.roleId IN (:...roleIdArr)", { roleIdArr })
            .getMany()
        return menuList.map(item => item.perms)
    }


    /* 根据角色查询 菜单列表 */
    async getMenuList(isAdmin: boolean, roleIdArr: number[]): Promise<Router[]> {
        const queryBuilder = this.menuRepository.createQueryBuilder('menu')
            .select('menu.menuId', 'menuId')
            .addSelect('menu.createTime', 'createTime')
            .addSelect('menu.menuName', 'menuName')
            .addSelect('menu.orderNum', 'orderNum')
            .addSelect('menu.status', 'status')
            .addSelect('menu.perms', 'perms')
            .addSelect('menu.icon', 'icon')
            .addSelect('menu.component', 'component')
            .addSelect('menu.menuType', 'menuType')
            .addSelect('menu.isFrame', 'isFrame')
            .addSelect('menu.isCache', 'isCache')
            .addSelect('menu.visible', 'visible')
            .addSelect('menu.path', 'path')
            .addSelect('menu.query', 'query')
            .addSelect("ifnull(menu.parentMenuId,0)", "parentId")
            .andWhere("menu.menuType in ('M','C')")
            .andWhere(qb => {
                const subQuery = qb.subQuery()
                    .select('menu2.menu_id')
                    .from(Menu, 'menu2')
                    .where("menu2.status=1")
                    .andWhere("concat('.',menu.mpath) like concat('%.',menu2.menu_id,'.%')")
                    .getQuery()
                return "not exists" + subQuery
            })
        /* 如果不是超级管理员，关联角色查询 */
        if (!isAdmin && roleIdArr) {
            queryBuilder.innerJoin('menu.roles', "role", "role.delFlag = 0")
                .andWhere("role.status = 0 and role.roleId IN (:...roleIdArr)", { roleIdArr })
        }
        const menuList: ReqUpdateMenu[] = await queryBuilder.groupBy('menu.menuId').orderBy('menu.orderNum').getRawMany()
        const menuTreeList = []
        this.sharedService.handleTree(menuList, 'menuId').forEach(item => {
            if (item.parentId == 0) {
                if (item.menuType == "C") {
                    let obj = {
                        component: "Layout",
                        hidden: false,
                        path: "/",
                        visible: '0',
                        children: [JSON.parse(JSON.stringify(item))]
                    }
                    menuTreeList.push(obj)
                } else {
                    item.path = '/' + item.path
                    menuTreeList.push(item)
                }
            }
        })
        return this.createRouterTree(menuTreeList)
    }

    /* 生成菜单树 */
    createRouterTree(menuArr: Menu[]): Router[] {
        let routerList: Router[] = []
        menuArr.forEach(item => {
            let router = new Router()
            if (this.firstToUpper(item.path)) {
                router.name = this.firstToUpper(item.path)
            }
            router.hidden = item.visible == '0' ? false : true
            if (item.menuType == "M" && item.isFrame == 1) {
                router.redirect = "noRedirect"
            }
            if (item.menuType == "M") {
                if (item.path.includes('/')) {
                    router.component = 'Layout'
                } else {
                    router.component = 'ParentView'
                }
            } else {
                router.component = item.component
            }
            if (item.menuType == "M") {
                router.alwaysShow = true
            }
            router.path = item.path
            router.meta = {
                title: item.menuName,
                icon: item.icon,
                noCache: item.isCache == 0 ? false : true,
                link: item.isFrame == 0 ? item.component : null
            }
            if (item.children && item.children.length) {
                router.children = this.createRouterTree(item.children)
            }
            routerList.push(router)
        })
        return routerList
    }

    // 首字母大写
    firstToUpper(pathStr: string) {
        let str = pathStr.replace('/', '').trim()
        if (str) {
            return str.toLowerCase().replace(str[0], str[0].toUpperCase());
        }
        return ''
    }
}


