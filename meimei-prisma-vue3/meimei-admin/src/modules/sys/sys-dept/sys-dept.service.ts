/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-13 13:59:22
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2025-07-28 20:29:27
 * @FilePath: /meimei-admin/src/modules/sys/sys-dept/sys-dept.service.ts
 * @Description:
 *
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  AddSysDeptDto,
  GetSysDeptListDto,
  UpdateSysDeptDto,
} from './dto/req-sys-dept.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { DataScope } from 'src/common/type/data-scope.type';

@Injectable()
export class SysDeptService {
  constructor(private readonly prisma: PrismaService) {}
  /* 列表查询 */
  async list(getSysDeptListDto: GetSysDeptListDto, dataScope: DataScope) {
    const { deptName, status } = getSysDeptListDto;
    return await this.prisma.sysDept.findMany({
      orderBy: {
        orderNum: 'asc',
      },
      where: {
        AND: {
          status,
          delFlag: '0',
          deptName: {
            contains: deptName,
          },
          OR: dataScope.OR,
        },
      },
    });
  }

  /* 查询这个id之外的部门 */
  async listExclude(deptId: number) {
    return await this.prisma.sysDept.findMany({
      where: {
        delFlag: '0',
        ancestors: {
          not: {
            contains: `,${deptId},`,
          },
        },
      },
    });
  }

  /* 新增 */
  async add(addSysDeptDto: AddSysDeptDto) {
    const { parentId } = addSysDeptDto;
    let parentDept = undefined;
    const dept = await this.prisma.$transaction(async (prisma) => {
      parentDept = await prisma.sysDept.findUnique({
        where: {
          deptId: parentId,
        },
      });
      if (!parentDept) throw new ApiException('上级部门不存在，请重新选择。');
      return await prisma.sysDept.create({
        data: addSysDeptDto,
      });
    });
    await this.prisma.sysDept.update({
      where: { deptId: dept.deptId },
      data: {
        ancestors: parentDept.ancestors + dept.deptId + ',',
      },
    });
  }

  /* 通过id查询 */
  async oneByDeptId(deptId: number) {
    return await this.prisma.sysDept.findUnique({
      where: {
        deptId,
      },
    });
  }

  /* 更新 */
  async update(updateSysDeptDto: UpdateSysDeptDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const { deptId } = updateSysDeptDto;
      const dept = await prisma.sysDept.findUnique({
        where: {
          deptId,
        },
      });
      if (!dept) throw new ApiException('该记录不存在，请重新查询后操作。');
      const { parentId } = updateSysDeptDto;
      const parentDept = await prisma.sysDept.findUnique({
        where: {
          deptId: parentId,
        },
      });
      if (!parentDept) throw new ApiException('上级部门不存在，请重新选择。');
      updateSysDeptDto.ancestors =
        parentDept.ancestors + updateSysDeptDto.deptId + ',';
      return await prisma.sysDept.update({
        data: updateSysDeptDto,
        where: {
          deptId,
        },
      });
    });
  }

  /* 删除 */
  async delete(deptId: number) {
    return await this.prisma.$transaction(async (prisma) => {
      const dept = await prisma.sysDept.findUnique({
        include: {
          childDept: {
            where: {
              delFlag: '0',
            },
          },
        },
        where: {
          deptId,
        },
      });
      if (!dept) throw new ApiException('该菜单不存在，请刷新后重试。');
      if (dept && dept.childDept && dept.childDept.length)
        throw new ApiException('该菜单下存在其他子菜单，无法删除');
      await prisma.sysDept.update({
        data: { delFlag: '1' },
        where: {
          deptId,
        },
      });
    });
  }
}
