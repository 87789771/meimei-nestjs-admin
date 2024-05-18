/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-25 19:09:21
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 17:26:45
 * @FilePath: \meimei-new\src\shared\prisma\prisma.extension.ts
 * @Description: 自定义数据库方法
 *
 */
import { Prisma, PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient().$extends({
  model: {
    $allModels: {
      // 查询并且计数
      async findAndCount<T, A>(
        this: T,
        args: Prisma.Args<T, 'findMany'>,
      ): Promise<{
        rows: Prisma.Result<T, Prisma.Args<T, 'findMany'>, 'findMany'>;
        total: number;
      }> {
        const context: any = Prisma.getExtensionContext(this);
        // 不使用事务，查询会更快
        const [rows, total] = await Promise.all([
          context.findMany(args),
          context.count({ where: args.where }),
        ]);
        // 下面是事务查询，反应慢
        // const [rows, total] = await extendedPrismaClient.$transaction([
        //   context.findMany(args),
        //   context.count({ where: args.where }),
        // ]);
        return {
          rows,
          total,
        };
      },

      async cheshi<T, A>() {},
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
