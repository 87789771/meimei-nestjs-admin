/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 21:55:32
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-13 14:56:12
 * @FilePath: \meimei-new\src\modules\monitor\login-infor\login-infor.service.ts
 * @Description:
 *
 */
import { Inject, Injectable } from '@nestjs/common';
import {
  AddLoginInforDto,
  GetLoginInforListDto,
} from './dto/req-login-infor.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/shared/prisma/prisma.extension';
import { Request } from 'express';
import dayjs from 'dayjs';
import { UAParser } from 'ua-parser-js';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class LoginInforService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sharedService: SharedService,
  ) {}
  @Inject('CustomPrisma')
  private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>;

  /* 新增登录日志 */
  async addLoginInfor(request: Request, msg: string, status: string) {
    try {
      const addLoginInforDto = new AddLoginInforDto();
      const { username } = request.body;
      const { browser, os } = UAParser(request.headers['user-agent']); //获取用户电脑信息
      addLoginInforDto.userName = username;
      addLoginInforDto.ipaddr = this.sharedService.getReqIP(request);
      addLoginInforDto.loginLocation = await this.sharedService.getLocation(
        addLoginInforDto.ipaddr,
      );
      addLoginInforDto.status = status;
      addLoginInforDto.msg = msg;
      addLoginInforDto.loginTime = dayjs().format();
      addLoginInforDto.browser = browser.name + browser.version.split('.')[0];
      addLoginInforDto.os = os.name + os.version;
      await this.prisma.sysLoginInfor.create({ data: addLoginInforDto });
      return addLoginInforDto;
    } catch (error) {
      console.error('登录日志记录失败：' + error);
    }
  }

  /* 分页查询 */
  async list(getLoginInforListDto: GetLoginInforListDto) {
    const { skip, take, ipaddr, userName, status, params } =
      getLoginInforListDto;
    return this.customPrisma.client.sysLoginInfor.findAndCount({
      orderBy: {
        loginTime: 'desc',
      },
      where: {
        status,
        ipaddr: {
          contains: ipaddr,
        },
        userName: {
          contains: userName,
        },
        loginTime: {
          gte: params.beginTime,
          lt: params.endTime,
        },
      },
      skip,
      take,
    });
  }

  /* 清空日志记录 */
  async cleanLoginInfor() {
    await this.prisma.sysLoginInfor.deleteMany({});
  }

  /* 清除日志 */
  async deleteLoginInfor(loginInforIdArr: number[]) {
    await this.prisma.sysLoginInfor.deleteMany({
      where: {
        infoId: {
          in: loginInforIdArr,
        },
      },
    });
  }
}
