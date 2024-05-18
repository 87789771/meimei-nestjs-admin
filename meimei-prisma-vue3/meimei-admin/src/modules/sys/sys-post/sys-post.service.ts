/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-11 13:32:00
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-13 16:42:30
 * @FilePath: \meimei-new\src\modules\sys\sys-post\sys-post.service.ts
 * @Description:
 *
 */
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService, PrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/shared/prisma/prisma.extension';
import {
  AddSysPostDto,
  GetSysPostListDto,
  UpdateSysPostDto,
} from './dto/req-sys-post.dto';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class SysPostService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CustomPrisma')
    private readonly customPrisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}
  /* 分页查询 */
  async list(getSysPostListDto: GetSysPostListDto) {
    const { skip, take, postCode, postName, status } = getSysPostListDto;
    return await this.customPrisma.client.sysPost.findAndCount({
      orderBy: {
        postSort: 'asc',
      },
      where: {
        status,
        postCode: {
          contains: postCode,
        },
        postName: {
          contains: postName,
        },
      },
      skip,
      take,
    });
  }

  /* 新增 */
  async add(addSysPostDto: AddSysPostDto) {
    const post = await this.prisma.sysPost.findUnique({
      where: {
        postCode: addSysPostDto.postCode,
      },
    });
    if (post) throw new ApiException('岗位编码已存在，请更换后再试。');
    return await this.prisma.sysPost.create({
      data: addSysPostDto,
    });
  }

  /* 通过id查询 */
  async oneByPostId(postId: number) {
    return await this.prisma.sysPost.findUnique({
      where: {
        postId,
      },
    });
  }

  /* 更新 */
  async update(updateSysPostDto: UpdateSysPostDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { postId, postCode } = updateSysPostDto;
      const post = await prisma.sysPost.findUnique({
        where: {
          postId,
        },
      });
      if (!post) throw new ApiException('该记录不存在，请重新查询后操作。');
      const post2 = await prisma.sysPost.findFirst({
        where: {
          postCode,
          postId: {
            not: postId,
          },
        },
      });
      if (post2) throw new ApiException('岗位编码已存在，请更换后再试。');
      return await prisma.sysPost.update({
        data: updateSysPostDto,
        where: {
          postId,
        },
      });
    });
  }

  /* 删除岗位 */
  async delete(postIdArr: number[]) {
    await this.prisma.sysPost.deleteMany({
      where: {
        postId: {
          in: postIdArr,
        },
      },
    });
  }
}
