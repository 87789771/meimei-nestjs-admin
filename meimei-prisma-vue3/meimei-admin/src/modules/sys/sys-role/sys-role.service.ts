/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-11 13:32:00
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-18 10:27:01
 * @FilePath: /meimei-new/src/modules/sys/sys-role/sys-role.service.ts
 * @Description:
 *
 */
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/shared/prisma/prisma.extension';
import {
  AddSysRoleDto,
  AllocatedListDto,
  CancelDto,
  ChangeStatusDto,
  DataScopeDto,
  GetSysRoleListDto,
  UpdateSysRoleDto,
} from './dto/req-sys-role.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SharedService } from 'src/shared/shared.service';
import { DataScope } from 'src/common/type/data-scope.type';
import { USER_VERSION_KEY } from 'src/common/contants/redis.contant';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class SysRoleService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CustomPrisma')
    private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>,
    private readonly sharedService: SharedService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  /* 分页查询 */
  async list(getSysRoleListDto: GetSysRoleListDto) {
    const { skip, take, status } = getSysRoleListDto;
    return await this.customPrisma.client.sysRole.findAndCount({
      orderBy: {
        roleSort: 'asc',
      },
      where: {
        delFlag: '0',
        status,
      },
      skip,
      take,
    });
  }

  /* 新增 */
  async add(addSysRoleDto: AddSysRoleDto) {
    const role = await this.prisma.sysRole.findFirst({
      where: {
        delFlag: '0',
        roleKey: addSysRoleDto.roleKey,
      },
    });
    if (role) throw new ApiException('权限字符已存在，请更换后再试。');
    const params: AddSysRoleDto = JSON.parse(JSON.stringify(addSysRoleDto));
    delete params.menuIds;
    return await this.prisma.sysRole.create({
      data: {
        ...params,
        menus: {
          connect: addSysRoleDto.menuIds.map((menuId) => ({ menuId })),
        },
      },
    });
  }

  /* 通过id查询 */
  async oneByRoleId(roleId: number) {
    return await this.prisma.sysRole.findUnique({
      where: {
        roleId,
      },
    });
  }

  /* 更新 */
  async update(updateSysRoleDto: UpdateSysRoleDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { roleId, roleKey } = updateSysRoleDto;
      const role = await prisma.sysRole.findUnique({
        where: {
          delFlag: '0',
          roleId,
        },
      });
      if (!role) throw new ApiException('该记录不存在，请重新查询后操作。');
      const role2 = await prisma.sysRole.findFirst({
        where: {
          delFlag: '0',
          roleKey,
          roleId: {
            not: roleId,
          },
        },
      });
      if (role2) throw new ApiException('权限字符已存在，请更换后再试。');
      const params: AddSysRoleDto = JSON.parse(
        JSON.stringify(updateSysRoleDto),
      );
      delete params.menuIds;
      await prisma.sysRole.update({
        data: {
          ...params,
          menus: {
            set: updateSysRoleDto.menuIds.map((menuId) => ({ menuId })),
          },
        },
        where: {
          roleId,
        },
      });
      return await this.addRuleUserPv(roleId);
    });
  }

  /* 更新数据权限 */
  async dataScope(dataScopeDto: DataScopeDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { roleId, roleKey } = dataScopeDto;
      const role = await prisma.sysRole.findUnique({
        where: {
          delFlag: '0',
          roleId,
        },
      });
      if (!role) throw new ApiException('该记录不存在，请重新查询后操作。');
      const role2 = await prisma.sysRole.findFirst({
        where: {
          delFlag: '0',
          roleKey,
          roleId: {
            not: roleId,
          },
        },
      });
      if (role2) throw new ApiException('权限字符已存在，请更换后再试。');
      const params: DataScopeDto = JSON.parse(JSON.stringify(dataScopeDto));
      delete params.deptIds;
      await prisma.sysRole.update({
        data: {
          ...params,
          depts: {
            set: dataScopeDto.deptIds.map((deptId) => ({ deptId })),
          },
        },
        where: {
          roleId,
        },
      });
      return await this.addRuleUserPv(roleId);
    });
  }

  /* 删除角色 */
  async delete(roleIdArr: number[]) {
    await this.prisma.sysRole.updateMany({
      data: {
        delFlag: '1',
      },
      where: {
        roleId: {
          in: roleIdArr,
        },
      },
    });
    const promiseArr = roleIdArr.map((roleId) => this.addRuleUserPv(roleId));
    await Promise.all(promiseArr);
  }

  /* 更新角色状态 */
  async changeStatus(changeStatusDto: ChangeStatusDto) {
    const { roleId, status } = changeStatusDto;
    await this.prisma.sysRole.update({
      where: {
        roleId,
      },
      data: {
        status,
      },
    });
    return await this.addRuleUserPv(roleId);
  }

  /* 查询部门树 */
  async treeselect() {
    const deptList = await this.prisma.sysDept.findMany({
      select: {
        deptId: true,
        parentId: true,
        deptName: true,
      },
      where: {
        delFlag: '0',
      },
    });
    const newList = deptList.map((item) => ({
      id: item.deptId,
      parentId: item.parentId,
      label: item.deptName,
    }));
    const list = this.sharedService.handleTree(newList);
    return list;
  }

  /* 获取角色对应的部门id数组 */
  async getRoleDept(roleId: number) {
    const role = await this.prisma.sysRole.findUnique({
      include: {
        depts: true,
      },
      where: {
        roleId,
        delFlag: '0',
      },
    });
    const { depts, deptCheckStrictly } = role;
    if (!deptCheckStrictly) return depts.map((menu) => menu.deptId);
    const filterRole = depts.filter((dept) => {
      return !depts.some(
        (dept2) =>
          dept.deptId != dept2.deptId &&
          ` ${dept2.ancestors}`.includes(`,${dept.deptId},`),
      );
    });
    return filterRole.map((menu) => menu.deptId);
  }

  /* 分页查询角色下用户列表 */
  async allocatedList(
    allocatedListDto: AllocatedListDto,
    dataScope: DataScope,
  ) {
    const { skip, take, roleId, userName, phonenumber } = allocatedListDto;
    return await this.customPrisma.client.sysUser.findAndCount({
      where: {
        AND: {
          delFlag: '0',
          userName: {
            contains: userName,
          },
          phonenumber: {
            contains: phonenumber,
          },
          roles: {
            some: {
              roleId,
            },
          },
          OR: dataScope.OR,
        },
      },
      skip,
      take,
    });
  }

  /* 分页查询不在角色下用户列表 */
  async unallocatedList(
    allocatedListDto: AllocatedListDto,
    dataScope: DataScope,
  ) {
    const { skip, take, roleId, userName, phonenumber } = allocatedListDto;
    return await this.customPrisma.client.sysUser.findAndCount({
      where: {
        AND: {
          delFlag: '0',
          userName: {
            contains: userName,
          },
          phonenumber: {
            contains: phonenumber,
          },
          roles: {
            none: {
              roleId,
            },
          },
          OR: dataScope.OR,
        },
      },
      skip,
      take,
    });
  }

  /* 批量给角色添加用户 */
  async selectAll(roleId: number, userArr: { userId: number }[]) {
    await this.prisma.sysRole.update({
      where: {
        roleId,
      },
      data: {
        users: {
          connect: userArr,
        },
      },
    });
    const promiseArr = userArr.map((user) => this.addPv(user.userId));
    return await Promise.all(promiseArr);
  }

  /* 批量给角色去除用户 */
  async cancelAll(roleId: number, userArr: { userId: number }[]) {
    await this.prisma.sysRole.update({
      where: {
        roleId,
      },
      data: {
        users: {
          disconnect: userArr,
        },
      },
    });
    const promiseArr = userArr.map((user) => this.addPv(user.userId));
    return await Promise.all(promiseArr);
  }

  /* 给角色去除用户 */
  async cancel(cancelDto: CancelDto) {
    const { roleId, userId } = cancelDto;
    await this.prisma.sysRole.update({
      where: {
        roleId,
      },
      data: {
        users: {
          disconnect: { userId },
        },
      },
    });
    return await this.addPv(userId);
  }

  /* 让该角色下的所有用户的的缓存版本号增加 ， 让他们重新登录 */
  async addRuleUserPv(roleId: number) {
    const users = await this.prisma.sysUser.findMany({
      where: {
        roles: {
          some: {
            roleId,
          },
        },
      },
    });
    const promiseArr = users.map((user) => {
      return this.addPv(user.userId);
    });
    await Promise.all(promiseArr);
  }

  /* 调整用户的缓存版本号，让用户重新登录 */
  async addPv(userId: number) {
    return await this.redis.incr(`${USER_VERSION_KEY}:${userId}`);
  }
}
