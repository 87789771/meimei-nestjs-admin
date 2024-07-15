import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CAPTCHA_IMG_KEY,
  USER_INFO_KEY,
  USER_ONLINE_KEY,
  USER_TOKEN_KEY,
  USER_VERSION_KEY,
} from 'src/common/contants/redis.contant';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SharedService } from 'src/shared/shared.service';
import { ConfigService } from '@nestjs/config';
import { Payload } from './login.interface';
import Redis from 'ioredis';
import { SysDept, SysRole, SysUser } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Menu, ResInfo, Route } from './dto/res-login.dto';
import { LoginInforService } from '../monitor/login-infor/login-infor.service';
import { Request } from 'express';
import { DataScope } from 'src/common/type/data-scope.type';
import { OnlineDto } from '../monitor/online/dto/res-online.dto';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class LoginService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly loginInforService: LoginInforService,
  ) {}

  /* 创建验证码图片 */
  async createImageCaptcha() {
    const { data, text } = svgCaptcha.createMathExpr({
      size: 4, //验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#ffffff', // 验证码图片背景颜色
      width: 115.5,
      height: 38,
    });
    const result = {
      img: data.toString(),
      uuid: this.sharedService.generateUUID(),
    };
    await this.redis.set(
      `${CAPTCHA_IMG_KEY}:${result.uuid}`,
      text,
      'EX',
      60 * 5,
    );
    return result;
  }

  /* 登录 */
  async login(user: SysUser, req: Request) {
    const { userId } = user;
    const payload: Payload = { userId, pv: 1 };
    // 加载一遍用户信息
    await this.getInfo(userId);
    //生成token
    let jwtSign = this.jwtService.sign(payload);
    //演示环境 复用 token，取消单点登录。
    if (this.configService.get<boolean>('isDemoEnvironment')) {
      const token = await this.redis.get(`${USER_TOKEN_KEY}:${userId}`);
      if (token) {
        jwtSign = token;
      }
    }
    //存储密码版本号，防止登录期间 用户信息被管理员更改后 还能继续登录
    //存储token, 防止重复登录问题，设置token过期时间(7天后 token 自动过期)，以及主动注销token。
    const expiresIn = this.configService.get('expiresIn') || 60 * 60 * 24 * 7;
    //记录登录成功日志, 登录失败的日志在 local-auth.guard 中进行记录
    const addLoginInforDto = await this.loginInforService.addLoginInfor(
      req,
      '登录成功',
      '0',
    );
    // 登记在线用户
    const onlineObj: OnlineDto = Object.assign(
      {
        tokenId: USER_TOKEN_KEY + ':' + userId,
        deptName: (user as any)?.dept?.deptName,
      },
      addLoginInforDto,
    );
    await this.redis
      .pipeline()
      .set(`${USER_VERSION_KEY}:${userId}`, 1)
      .set(`${USER_TOKEN_KEY}:${userId}`, jwtSign, 'EX', expiresIn)
      .set(
        `${USER_ONLINE_KEY}:${userId}`,
        JSON.stringify(onlineObj),
        'EX',
        expiresIn,
      )
      .exec();
    return { token: jwtSign };
  }

  /* 退出登录 */
  async logout(token: string) {
    try {
      const payload = this.jwtService.verify(token) as Payload;
      await this.redis.del(`${USER_TOKEN_KEY}:${payload.userId}`);
    } catch (error) {}
  }

  /* 获取用户信息 */
  async getInfo(userId: number) {
    const user = await this.prisma.sysUser.findUnique({
      where: {
        userId,
        status: '0',
        delFlag: '0',
      },
      include: {
        roles: {
          where: {
            delFlag: '0',
            status: '0',
          },
        },
        dept: {
          where: {
            delFlag: '0',
            status: '0',
          },
        },
        posts: {
          where: {
            status: '0',
          },
        },
      },
    });
    if (!user) throw new ApiException('用户不存在', 401);
    const roles = user.roles.map((item) => item.roleKey);
    let permissions = [];
    if (roles.includes('admin')) {
      permissions = ['*:*:*'];
    } else {
      const menus = await this.prisma.sysMenu.findMany({
        select: {
          perms: true,
        },
        where: {
          AND: [
            {
              perms: {
                not: null,
              },
            },
            {
              perms: {
                not: '',
              },
            },
          ],
          status: '0',
          roles: {
            some: {
              status: '0',
              delFlag: '0',
              users: {
                some: {
                  status: '0',
                  delFlag: '0',
                  userId: userId,
                },
              },
            },
          },
        },
      });
      permissions = menus.map((item) => item.perms);
    }
    //获取用户数据权限范围
    const dataScope = await this.getDataScope(user.roles, user);
    // 将这些信息存放到redis中方便后续流程取用
    this.redis.set(
      `${USER_INFO_KEY}:${userId}`,
      JSON.stringify({
        ...user,
        permissions,
        dataScope,
      }),
    );
  }

  /* 获取用户数据权限范围 */
  async getDataScope(roles: SysRole[], user: SysUser): Promise<DataScope> {
    let deptIds: number[] | undefined = [];
    let userName: string | undefined = undefined;
    // 没有角色，没有数据权限
    if (!roles?.length) {
      return {
        deptIds,
        userName,
        OR: undefined,
      };
    }
    if (
      roles.find((role) => role.roleKey === 'admin' || role.dataScope === '1')
    ) {
      deptIds = undefined;
      return {
        deptIds,
        userName,
        OR: undefined,
      };
    }
    const deptPromise = roles.map((role) => {
      if (role.dataScope === '2') {
        // 自定义数据权限
        const deptCheckStrictly = role.deptCheckStrictly;
        return this.prisma.sysDept
          .findMany({
            where: {
              roles: {
                some: {
                  roleId: role.roleId,
                },
              },
            },
          })
          .then((depts) => {
            if (!deptCheckStrictly) return depts;
            const filterRole = depts.filter((dept) => {
              return !depts.some(
                (dept2) =>
                  dept.deptId != dept2.deptId &&
                  ` ${dept2.ancestors}`.includes(`,${dept.deptId},`),
              );
            });
            return filterRole;
          });
      } else if (role.dataScope === '3') {
        //本部门数据权限
        return this.prisma.sysDept.findMany({
          where: {
            users: {
              some: {
                userId: user.userId,
              },
            },
          },
        });
      } else if (role.dataScope === '4') {
        //本部门及以下数据权限
        return this.prisma.sysDept.findMany({
          where: {
            ancestors: {
              contains: ',' + user.deptId + ',',
            },
          },
        });
      } else if (role.dataScope === '5') {
        //仅本人数据权限
        userName = user.userName;
        return [];
      }
    });
    const deptArrArr: SysDept[][] = await Promise.all(deptPromise);
    deptArrArr.forEach((item) => {
      item.forEach((dept) => {
        if (!deptIds.find((deptId) => deptId === dept.deptId)) {
          deptIds.push(dept.deptId);
        }
      });
    });
    return {
      deptIds,
      userName,
      OR: [
        {
          deptId: {
            in: deptIds,
          },
        },
        {
          createBy: userName,
        },
      ],
    };
  }

  /* 获取当前用户的菜单 */
  async getRouters(userId: number, permissions: string[]) {
    let rolesWhere = {
      some: {
        delFlag: '0',
        status: '0',
        users: {
          some: {
            delFlag: '0',
            status: '0',
            userId: userId,
          },
        },
      },
    };
    if (permissions.includes('*:*:*')) {
      rolesWhere = undefined;
    }
    const menus = await this.prisma.sysMenu.findMany({
      where: {
        status: '0',
        menuType: {
          in: ['M', 'C'],
        },
        roles: rolesWhere,
      },
      orderBy: {
        orderNum: 'asc',
      },
    });
    const menuTree: Menu[] = this.sharedService.handleTree(menus, 'menuId');
    const routerTree = menuTree.map((item) => new Route(item));
    return routerTree;
  }
}
