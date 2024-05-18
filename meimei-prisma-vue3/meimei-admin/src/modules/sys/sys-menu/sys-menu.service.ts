/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-13 13:59:22
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 21:57:51
 * @FilePath: /meimei-new/src/modules/sys/sys-menu/sys-menu.service.ts
 * @Description:
 *
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  AddSysMenuDto,
  GetSysMenuListDto,
  UpdateSysMenuDto,
} from './dto/req-sys-menu.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class SysMenuService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sharedService: SharedService,
  ) {}
  /* 列表查询 */
  async list(getSysMenuListDto: GetSysMenuListDto) {
    const { menuName, status } = getSysMenuListDto;
    const menuList = await this.prisma.sysMenu.findMany({
      orderBy: {
        orderNum: 'asc',
      },
      where: {
        status,
        menuName: {
          contains: menuName,
        },
      },
    });
    menuList.forEach((menu) => (menu.parentId = Number(menu.parentId)));
    return menuList;
  }

  /* 新增 */
  async add(addSysMenuDto: AddSysMenuDto) {
    const { parentId } = addSysMenuDto;
    return await this.prisma.$transaction(async (prisma) => {
      if (parentId === 0) {
        delete addSysMenuDto.parentId;
      } else {
        const parentMenu = await prisma.sysMenu.findUnique({
          where: {
            menuId: parentId,
          },
        });
        if (!parentMenu) throw new ApiException('上级菜单不存在，请重新选择。');
      }
      return await prisma.sysMenu.create({
        data: addSysMenuDto,
      });
    });
  }

  /* 通过id查询 */
  async oneByMenuId(menuId: number) {
    const dept = await this.prisma.sysMenu.findUnique({
      where: {
        menuId,
      },
    });
    dept.parentId = Number(dept.parentId);
    return dept;
  }

  /* 更新 */
  async update(updateSysMenuDto: UpdateSysMenuDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { menuId } = updateSysMenuDto;
      const menu = await prisma.sysMenu.findUnique({
        where: {
          menuId,
        },
        include: {
          childMenu: {
            where: {
              status: '0',
            },
          },
        },
      });
      if (!menu) throw new ApiException('菜单不不存在，请重新查询后操作。');
      if (updateSysMenuDto.status === '1' && menu.childMenu?.length)
        throw new ApiException('该菜单下存在其他正在使用的菜单，无法停用！');
      const { parentId } = updateSysMenuDto;
      if (parentId === 0) {
        delete updateSysMenuDto.parentId;
      } else {
        const parentMenu = await prisma.sysMenu.findUnique({
          where: {
            menuId: parentId,
          },
        });
        if (!parentMenu) throw new ApiException('上级菜单不存在，请重新选择。');
      }
      return await prisma.sysMenu.update({
        data: updateSysMenuDto,
        where: {
          menuId,
        },
      });
    });
  }

  /* 删除 */
  async delete(menuId: number) {
    return await this.prisma.$transaction(async (prisma) => {
      const menu = await prisma.sysMenu.findUnique({
        include: {
          childMenu: true,
        },
        where: {
          menuId,
        },
      });
      if (!menu) throw new ApiException('该菜单不存在，请刷新后重试。');
      if (menu && menu.childMenu && menu.childMenu.length)
        throw new ApiException('该菜单下存在其他子菜单，无法删除。');
      await prisma.sysMenu.delete({
        where: {
          menuId,
        },
      });
    });
  }

  /* 获取菜单树 */
  async treeselect() {
    const menuList = await this.prisma.sysMenu.findMany({
      select: {
        menuId: true,
        parentId: true,
        menuName: true,
      },
    });
    const newList = menuList.map((item) => ({
      id: item.menuId,
      parentId: item.parentId,
      label: item.menuName,
    }));
    const list = this.sharedService.handleTree(newList);
    return list;
  }

  /* 获取角色对应的菜单id数组 */
  async getRoleMenu(roleId: number) {
    const menuList = await this.prisma.sysMenu.findMany({
      select: {
        menuId: true,
      },
      where: {
        roles: {
          some: {
            roleId,
          },
        },
      },
    });
    return menuList.map((menu) => menu.menuId);
  }
}
