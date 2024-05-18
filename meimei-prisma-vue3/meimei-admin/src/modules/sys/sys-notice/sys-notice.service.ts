/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-11 10:32:53
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 15:33:13
 * @FilePath: \meimei-new\src\modules\sys\sys-notice\sys-notice.service.ts
 * @Description: 
 * 
 */
import { Inject, Injectable } from '@nestjs/common';
import {
  AddSysNoticeDto,
  GetSysNoticeListDto,
  UpdateSysNoticeDto,
} from './dto/req-sys-notice.dto';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/shared/prisma/prisma.extension';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class SysNoticeService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CustomPrisma')
    private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}
  /* 分页查询 */
  async list(getSysNoticeListDto: GetSysNoticeListDto) {
    const { noticeTitle, createBy, noticeType } = getSysNoticeListDto;
    const { total, rows } =
      await this.customPrisma.client.sysNotice.findAndCount({
        where: {
          noticeType,
          noticeTitle: {
            contains: noticeTitle,
          },
          createBy: {
            contains: createBy,
          },
        },
      });
    const newrows = rows.map((item) => {
      return Object.assign({}, item, {
        noticeContent: item.noticeContent.toString(),
      });
    });
    return { total, rows: newrows };
  }

  /* 新增 */
  async add(addSysNoticeDto: AddSysNoticeDto) {
    const data = Object.assign({}, addSysNoticeDto, {
      noticeContent: Buffer.from(addSysNoticeDto.noticeContent, 'utf8'),
    });
    return await this.prisma.sysNotice.create({
      data,
    });
  }

  /* 通过id查询 */
  async oneByNoticeId(noticeId: number) {
    const notice = await this.prisma.sysNotice.findUnique({
      where: {
        noticeId,
      },
    });
    return Object.assign({}, notice, {
      noticeContent: notice.noticeContent.toString(),
    });
  }

  /* 更新 */
  async update(updateSysNoticeDto: UpdateSysNoticeDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { noticeId } = updateSysNoticeDto;
      const notice = await prisma.sysNotice.findUnique({
        where: {
          noticeId,
        },
      });
      if (!notice) throw new ApiException('该记录不存在，请重新查询后操作。');
      const data = Object.assign({}, updateSysNoticeDto, {
        noticeContent: Buffer.from(updateSysNoticeDto.noticeContent, 'utf8'),
      });
      return await prisma.sysNotice.update({
        data,
        where: {
          noticeId,
        },
      });
    });
  }

  /* 删除公告 */
  async delete(noticeIdArr: number[]) {
    await this.prisma.sysNotice.deleteMany({
      where: {
        noticeId: {
          in: noticeIdArr,
        },
      },
    });
  }
}
