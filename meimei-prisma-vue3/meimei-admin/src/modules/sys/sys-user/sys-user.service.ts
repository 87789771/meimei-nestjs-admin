/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-11 13:32:00
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-06-27 11:17:14
 * @FilePath: \meimei-prisma-vue3\meimei-admin\src\modules\sys\sys-user\sys-user.service.ts
 * @Description:
 *
 */
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/shared/prisma/prisma.extension';
import {
  AddSysUserDto,
  CancelAllDto,
  ChangeStatusDto,
  GetSysUserListDto,
  ImportSysUserDto,
  ResetPwdDto,
  UpdataSelfDto,
  UpdateSelfPwd,
  UpdateSysUserDto,
} from './dto/req-sys-user.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SharedService } from 'src/shared/shared.service';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { DataScope } from 'src/common/type/data-scope.type';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { USER_VERSION_KEY } from 'src/common/contants/redis.contant';
import { LoginService } from 'src/modules/login/login.service';

@Injectable()
export class SysUserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CustomPrisma')
    private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>,
    private readonly sharedService: SharedService,
    @InjectRedis() private readonly redis: Redis,
    private readonly loginService: LoginService,
  ) {}
  /* 分页查询 */
  async list(getSysUserListDto: GetSysUserListDto, dataScope: DataScope) {
    const { skip, take, status, userName, deptId, phonenumber, params } =
      getSysUserListDto;
    const contains = deptId ? `,${deptId},` : undefined;
    return await this.customPrisma.client.sysUser.findAndCount({
      include: {
        dept: true,
      },
      where: {
        AND: {
          delFlag: '0',
          status,
          userName: {
            contains: userName,
          },
          phonenumber: {
            contains: phonenumber,
          },
          createTime: {
            gte: params.beginTime,
            lt: params.endTime,
          },
          dept: {
            ancestors: {
              contains,
            },
          },
          OR: dataScope.OR,
        },
      },
      skip,
      take,
    });
  }

  /* 查询岗位和角色列表 */
  async postAndRole() {
    return await Promise.all([
      this.prisma.sysPost.findMany({}),
      this.prisma.sysRole.findMany({
        where: {
          delFlag: '0',
        },
      }),
    ]);
  }

  /* 新增 */
  async add(addSysUserDto: AddSysUserDto) {
    const user = await this.prisma.sysUser.findFirst({
      where: {
        userName: addSysUserDto.userName,
      },
    });
    if (user) throw new ApiException('用户名称已存在，请更换后再试。');
    const params: AddSysUserDto = JSON.parse(JSON.stringify(addSysUserDto));
    // 加密密码
    const salt = await bcrypt.genSalt();
    params.password = await bcrypt.hash(params.password, salt);
    delete params.postIds;
    delete params.roleIds;
    return await this.prisma.sysUser.create({
      data: {
        ...params,
        posts: {
          connect: addSysUserDto.postIds.map((postId) => ({ postId })),
        },
        roles: {
          connect: addSysUserDto.roleIds.map((roleId) => ({ roleId })),
        },
      },
    });
  }

  /* 通过id查询 */
  async oneByUserId(userId: number) {
    return await this.prisma.sysUser.findUnique({
      include: {
        dept: {
          where: {
            delFlag: '0',
          },
        },
        posts: true,
        roles: {
          where: {
            delFlag: '0',
          },
        },
      },
      where: {
        userId,
        delFlag: '0',
      },
    });
  }

  /* 更新 */
  async update(updateSysUserDto: UpdateSysUserDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { userId } = updateSysUserDto;
      const user = await prisma.sysUser.findUnique({
        where: {
          userId,
        },
      });
      if (!user) throw new ApiException('该记录不存在，请重新查询后操作。');
      const params: AddSysUserDto = JSON.parse(
        JSON.stringify(updateSysUserDto),
      );
      delete params.postIds;
      delete params.roleIds;
      await prisma.sysUser.update({
        data: {
          ...params,
          posts: {
            set: updateSysUserDto.postIds.map((postId) => ({ postId })),
          },
          roles: {
            set: updateSysUserDto.roleIds.map((roleId) => ({ roleId })),
          },
        },
        where: {
          userId,
        },
      });
      return await this.addPv(userId);
    });
  }

  /* 删除用户 */
  async delete(userIdArr: number[]) {
    await this.prisma.sysUser.updateMany({
      data: {
        delFlag: '1',
      },
      where: {
        userId: {
          in: userIdArr,
        },
      },
    });
    const promiseArr = userIdArr.map((userId) => this.addPv(userId));
    await Promise.all(promiseArr);
  }

  /* 更新用户状态 */
  async changeStatus(changeStatusDto: ChangeStatusDto) {
    const { userId, status } = changeStatusDto;
    await this.prisma.sysUser.update({
      where: {
        userId,
      },
      data: {
        status,
      },
    });
    return await this.addPv(userId);
  }

  /* 查询部门树 */
  async treeselect(dataScope: DataScope) {
    const deptList = await this.prisma.sysDept.findMany({
      select: {
        deptId: true,
        parentId: true,
        deptName: true,
      },
      where: {
        AND: {
          delFlag: '0',
          OR: dataScope.OR,
        },
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

  /* 重置用户密码 */
  async resetPwd(resetPwdDto: ResetPwdDto) {
    const { userId, password } = resetPwdDto;
    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(password, salt);
    await this.prisma.sysUser.update({
      data: {
        password: newPassword,
      },
      where: {
        userId,
      },
    });
    return await this.addPv(userId);
  }

  /* 查询用户及  所有角色 */
  async authRole(userId: number) {
    const userProm = this.prisma.sysUser.findUnique({
      include: {
        roles: true,
      },
      where: {
        userId,
      },
    });
    const rolesProm = this.prisma.sysRole.findMany({
      select: {
        roleId: true,
        roleKey: true,
        roleName: true,
        createTime: true,
      },
      where: {
        delFlag: '0',
      },
    });
    const [user, roles] = await Promise.all([userProm, rolesProm]);
    const userRoles = user.roles;
    const newRoles = roles.map((item: any) => {
      item.flag = false;
      if (userRoles.find((item2) => item.roleId === item2.roleId)) {
        item.flag = true;
      }
      return item;
    });
    return {
      user,
      roles: newRoles,
    };
  }

  /* 批量取消或授权角色 */
  async cancelAll(cancelAllDto: CancelAllDto) {
    const { userId, roleIds } = cancelAllDto;
    await this.prisma.sysUser.update({
      where: {
        userId,
      },
      data: {
        roles: {
          set: roleIds.split(',').map((roleId) => ({ roleId: Number(roleId) })),
        },
      },
    });
    return await this.addPv(userId);
  }

  /* 导入用户列表 */
  async importData(importSysUserDtoArr: ImportSysUserDto[], isUpdate: boolean) {
    return await this.prisma.$transaction(async (prisma) => {
      for (const item of importSysUserDtoArr) {
        // 加密密码
        const salt = await bcrypt.genSalt();
        item.password = await bcrypt.hash(item.password, salt);
        item.createTime = dayjs().format();
        if (!isUpdate) {
          const user = await prisma.sysUser.findUnique({
            where: {
              userName: item.userName,
            },
          });
          if (user)
            throw new ApiException(
              '用户名：' + item.userName + ' 已经存在，请更换后再试。',
            );
          await prisma.sysUser.create({
            data: item,
          });
        } else {
          await prisma.sysUser.upsert({
            where: {
              userName: item.userName,
            },
            update: item,
            create: item,
          });
        }
      }
    });
  }

  /* 更新自己的信息 */
  async updataMyslf(updataSelfDto: UpdataSelfDto) {
    await this.prisma.sysUser.update({
      where: {
        userId: updataSelfDto.userId,
      },
      data: updataSelfDto,
    });
    return await this.loginService.getInfo(updataSelfDto.userId);
  }

  /* 更改个人密码 */
  async updatePwd(updateSelfPwd: UpdateSelfPwd) {
    const { userId, oldPassword, newPassword } = updateSelfPwd;
    return await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.sysUser.findUnique({
        where: {
          userId,
          delFlag: '0',
        },
      });
      if (!user) throw new ApiException('用户不存在');
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) throw new ApiException('旧密码错误');
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(newPassword, salt);
      return await prisma.sysUser.update({
        where: {
          userId,
        },
        data: {
          password,
        },
      });
    });
  }

  /* 调整用户的缓存版本号，让用户重新登录 */
  async addPv(userId: number) {
    return await this.redis.incr(`${USER_VERSION_KEY}:${userId}`);
  }

  /* 更新用户头像 */
  async uploadAvatar(avatar: string, userId: number) {
    await this.prisma.sysUser.update({
      data: {
        avatar,
      },
      where: {
        userId,
      },
    });
    return await this.loginService.getInfo(userId);
  }
}
