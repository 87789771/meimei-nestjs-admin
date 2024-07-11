/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-23 18:59:25
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-07-11 20:09:22
 * @FilePath: \meimei-prisma-vue3\meimei-admin\src\common\interceptors\operation-log.interceptor.ts
 * @Description: 接口访问日志拦截器
 *
 */

import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SharedService } from 'src/shared/shared.service';
import { AjaxResult } from '../class/ajax-result.class';
import { LOG_KEY_METADATA } from '../contants/decorator.contant';
import { BusinessTypeEnum, LogOption } from '../decorators/log.decorator';
import { AllExceptionsFilter } from '../filters/all-exception.filter';
import Redis from 'ioredis';
import { OperLogService } from 'src/modules/monitor/oper-log/oper-log.service';
import { AddOperLogDto } from 'src/modules/monitor/oper-log/dto/req-oper-log.dto';
import dayjs, { Dayjs } from 'dayjs';

@Injectable()
export class OperationLogInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
    private readonly operLogService: OperLogService,
    private readonly sharedService: SharedService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logOption = this.reflector.get<LogOption>(
      LOG_KEY_METADATA,
      context.getHandler(),
    );
    if (!logOption) {
      return next.handle();
    } else {
      // 获取开始时间
      const startTime = dayjs();
      return next.handle().pipe(
        tap({
          next: (data) => {
            // 进行异步记录就行，不需要用户等待, 无需返回
            this.log(context, data, logOption, startTime);
          },
          error: (e) => {
            const allExceptionsFilter = new AllExceptionsFilter();
            const { result } = allExceptionsFilter.errorResult(e);
            // 进行异步记录就行，不需要用户等待, 无需返回
            this.log(context, result, logOption, startTime);
          },
        }),
      );
    }
  }

  /* 记录操作日志 */
  async log(
    context: ExecutionContext,
    data: AjaxResult,
    logOption: LogOption,
    startTime: Dayjs,
  ) {
    const request = context.switchToHttp().getRequest();
    const method = request.method.toUpperCase();
    const user = request.user;
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const addOperLogDto = new AddOperLogDto();
    /* 模块标题 */
    addOperLogDto.title = logOption.title;
    /* 业务类型 */
    addOperLogDto.businessType = logOption.businessType;
    /* 请求方式 */
    addOperLogDto.requestMethod = method;
    /* 方法名称 */
    addOperLogDto.method = `${className}.${handlerName}()`;
    if (user) {
      /* 操作人员 */
      addOperLogDto.operName = user.userName;
      /* 部门名称 */
      addOperLogDto.deptName = user.dept?.deptName;
      /* 请求url */
      addOperLogDto.operUrl = request.url;
      /* 请求ip */
      addOperLogDto.operIp = this.sharedService.getReqIP(request);
      /* 请求地址 */
      addOperLogDto.operLocation = await this.sharedService.getLocation(
        addOperLogDto.operIp,
      );
      /* 请求参数 */
      if (logOption.isSaveRequestData) {
        const data = {
          params: request.params,
          query: request.query,
          body: request.body,
        };
        addOperLogDto.operParam = JSON.stringify(data);
      }
      /* 成功的请求 */
      if ((data && data.code === 200) || data instanceof StreamableFile) {
        //如果是流，都算成功
        addOperLogDto.status = '0';
      } else {
        //失败的请求
        addOperLogDto.status = '1';
        addOperLogDto.errorMsg = data?.msg?.toString();
      }
      /* 记录返回值 */
      if (
        logOption.isSaveResponseData &&
        addOperLogDto.businessType !== BusinessTypeEnum.export
      ) {
        addOperLogDto.jsonResult = JSON.stringify(data);
      }
      // 请求时间
      addOperLogDto.operTime = dayjs().format();
      // 操作时长(毫秒)
      addOperLogDto.costTime = dayjs().diff(startTime, 'millisecond');
      try {
        await this.operLogService.addOperLog(addOperLogDto);
      } catch (error) {
        console.error('日志记录失败了' + error);
      }
    }
  }
}
