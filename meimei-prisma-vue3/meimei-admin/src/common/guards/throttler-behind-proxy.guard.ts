/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-23 09:07:16
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-04-28 09:09:58
 * @FilePath: \meimei-new\src\common\guards\throttler-behind-proxy.guard.ts
 * @Description: 
 * 
 */
// throttler-behind-proxy.guard.ts
import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';
/**
 * 重写一下速率限制器守卫
 * 因为如果是 nginx 代理，用户的ip地址不是在req.ip中
 * 而是在 req.ips[0]中。
 */
@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {  
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.ips.length ? req.ips[0] : req.ip; // individualize IP extraction to meet your own needs
  }
}