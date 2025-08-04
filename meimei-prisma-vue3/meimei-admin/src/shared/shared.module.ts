/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-23 08:48:10
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-11-11 21:06:42
 * @FilePath: /meimei-admin/src/shared/shared.module.ts
 * @Description: 系统工具模块
 *
 */
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/index';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  APP_PIPE,
  HttpAdapterHost,
} from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from 'src/common/guards/throttler-behind-proxy.guard';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import {
  CustomPrismaModule,
  PrismaClientExceptionFilter,
  PrismaModule,
} from 'nestjs-prisma';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleAuthGuard } from 'src/common/guards/role-auth.guard';
import { RepeatSubmitGuard } from 'src/common/guards/repeat-submit.guard';
import { DemoEnvironmentGuard } from 'src/common/guards/demo-environment.guard';
import { ReponseTransformInterceptor } from 'src/common/interceptors/reponse-transform.interceptor';
import { PrismaConfigService } from './prisma/prisma-config.service';
import { ExtendedPrismaConfigService } from './prisma/extended-prisma-config.service';
import { PermissionAuthGuard } from 'src/common/guards/permission-auth.guard';
import { OperationLogInterceptor } from 'src/common/interceptors/operation-log.interceptor';
import { BullModule } from '@nestjs/bullmq';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import dayjs from 'dayjs';

@Global()
@Module({
  imports: [
    /**
     * 日志模块
     */
    WinstonModule.forRoot({
      transports: [
        // 可添加其他的传输方式，如文件传输，用于将日志保存到文件中
        new winston.transports.DailyRotateFile({
          filename: 'logs/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '35d',
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp({
              //格式化日志记录的时间为当前时区
              format: () => dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'),
            }),
            winston.format.json(),
          ),
        }),
      ],
    }),
    /**
     * 配置参数模块
     */
    ConfigModule.forRoot({
      load: [config],
      cache: true,
      isGlobal: true,
    }),

    /**
     * 导入Prisma数据库模块, 使用类来加载，方便配置
     * mysql 数据库的配置文件在 .env中。 它内部自动读取。
     */
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),

    /**
     * 增加prisma扩展客户端，方便业务操作
     * 可以自定义各种数据库操作方法。
     * 可以在数据库操作前做参数修改，在查询后做结果修改。
     */
    CustomPrismaModule.forRootAsync({
      name: 'CustomPrisma',
      isGlobal: true,
      useClass: ExtendedPrismaConfigService,
    }),

    /**
     * 启用redis缓存模块
     */
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const redis = configService.get('redis');
        return {
          type: 'single',
          url: `redis://:${redis.password}@${redis.host}:${redis.port}/${redis.db}`,
        };
      },
      inject: [ConfigService],
    }),

    /**
     * 启用队列模块
     */
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: configService.get('redis'),
      }),
      inject: [ConfigService],
    }),

    /**
     * 导入请求速率限制模块
     * ttl:单位毫秒钟
     * ttl 毫秒内最多请求 limit 次。避免暴力攻击
     * 可使用 @SkipThrottle() 跳过类或方法的限制
     * 可使用 @Throttle({ default: { limit: 3, ttl: 60000 } })单独设置某个类或方法
     * 该拦截是ip级别的，所以如果服务使用了代理（nginx），需要重写守卫以获得正确的ip。
     */
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 60,
      },
    ]),
  ],
  providers: [
    SharedService,

    /**
     * 全局异常过滤器
     */
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },

    /**
     * 全局参数校验管道
     */
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // 启用白名单，dto中没有声明的属性自动过滤
        transform: true, // 自动类型转换
      }),
    },

    /**
     * prisma 异常筛选器
     * 捕获未处理的 PrismaClientKnownRequestError，并返回不同的
     *  HttpStatus 代码，而不是 500 内部服务器错误
     */
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost],
    },

    /**
     * 使用重写的速率限制器守卫
     */
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },

    /**
     * jwt守卫
     */
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    /**
     * 角色守卫
     */
    {
      provide: APP_GUARD,
      useClass: RoleAuthGuard,
    },

    /**
     * 权限守卫
     */
    {
      provide: APP_GUARD,
      useClass: PermissionAuthGuard,
    },

    /**
     * 阻止连续提交守卫
     */
    {
      provide: APP_GUARD,
      useClass: RepeatSubmitGuard,
    },

    /**
     * 是否演示环境守卫
     */
    {
      provide: APP_GUARD,
      useClass: DemoEnvironmentGuard,
    },

    /**
     *  注：拦截器中的 handle 从下往上执行
     * （ReponseTransformInterceptor ----> OperationLogInterceptor）
     *  返回值值依次传递
     */

    /**
     * 操作日志记录拦截器
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: OperationLogInterceptor,
    },

    /**
     * 全局返回值转化拦截器
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: ReponseTransformInterceptor,
    },
  ],
  exports: [SharedService],
})
export class SharedModule {}
