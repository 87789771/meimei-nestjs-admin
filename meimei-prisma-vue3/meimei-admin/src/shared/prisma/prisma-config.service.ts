/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-25 13:26:28
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-16 21:57:48
 * @FilePath: /meimei-new/src/shared/prisma/prisma-config.service.ts
 * @Description: 使用类来构建prisma
 *
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  loggingMiddleware,
  PrismaOptionsFactory,
  PrismaServiceOptions,
  QueryInfo,
} from 'nestjs-prisma';

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  constructor() {
    // TODO inject any other service here like the `ConfigService`
  }

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    // 下面两个地址提供了各种配置和玩法。 看多了，脑子疼，感觉都能用得上。
    // https://www.prisma.io/docs/orm/prisma-client/client-extensions/model
    // https://nestjs-prisma.dev/docs/installation/
    return {
      // 配置参数
      prismaOptions: {
        // 控制台会打印基本信息info。和查询信息query。警告信息 warn。错误信息 error。
        // 同时这些事件可以在main.app中进行监听,可以方便做其他事。详情看文档。
        log: ['warn', 'error'],
        // 设置事务默认处理时间
        transactionOptions: {
          // Prisma 客户端等待从数据库获取事务的最长时间。
          maxWait: 10 * 1000,
          // 交互式事务在被取消和回滚之前可以运行的最长时间
          timeout: 20 * 1000,
        },
      },
      // 项目启动就创建连接池，第一个查询将立即响应，否则第一个查询会延时
      explicitConnect: true,
      // 配置中间件
      middlewares: [
        // 自定义日志中间件
        loggingMiddleware({
          logger: new Logger('PrismaMiddleware'),
          logLevel: 'log', // default is `debug`
          logMessage: (query: QueryInfo) => {
            // 返回值就是日志内容
            return `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`;
          },
        }),
      ],
    };
  }
}
