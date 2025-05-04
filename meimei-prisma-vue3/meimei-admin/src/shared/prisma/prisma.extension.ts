/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-25 19:09:21
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2025-05-04 23:45:29
 * @FilePath: /meimei-admin/src/shared/prisma/prisma.extension.ts
 * @Description: 自定义数据库方法
 *
 */
import { Prisma, PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient().$extends({
  model: {
    $allModels: {
      // 查询并且计数,支持关联查询时的类型提示
      async findAndCount<T, Args extends Prisma.Args<T, 'findMany'>>(
        this: T,
        args: Args,
      ): Promise<{
        rows: Prisma.Result<T, Args, 'findMany'>;
        total: number;
      }> {
        const context: any = Prisma.getExtensionContext(this);
        const [rows, total] = await Promise.all([
          context.findMany(args),
          context.count({ where: args.where }),
        ]);
        return { rows, total };
      }
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
