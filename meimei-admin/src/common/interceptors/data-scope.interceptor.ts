/*
 * @Author: Sheng.Jiang
 * @Date: 2022-01-05 19:43:12
 * @LastEditTime: 2022-07-04 20:01:40
 * @LastEditors: Please set LastEditors
 * @Description: 数据权限拦截器
 * @FilePath: \meimei-admin\src\common\interceptors\data-scope.interceptor.ts
 * You can you up，no can no bb！！
 */

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { concat, Observable } from 'rxjs';
import { Role } from 'src/modules/system/role/entities/role.entity';
import { DATASCOPE_KEY_METADATA } from '../contants/decorator.contant';
import { USER_DEPTID_KEY, USER_ROLEKS_KEY } from '../contants/redis.contant';
import { DeptOrUserAlias } from '../decorators/datascope.decorator';

@Injectable()
export class DataScopeInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector, @InjectRedis() private readonly redis: Redis) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let aliaObj: DeptOrUserAlias = this.reflector.get(DATASCOPE_KEY_METADATA, context.getHandler())
    if (aliaObj) {
      const request = context.switchToHttp().getRequest()
      return concat(
        this.setDataScope(request, aliaObj),
        next.handle()
      )
    } else {
      return next
        .handle()
    }
  }

  /* 获取数据权限 */
  async setDataScope(request, aliaObj: DeptOrUserAlias) {
    const { userId } = request.user
    let sqlString = ''
    /* 如果是超级管理员 ，就具备所有权限 */
    const roleArr: Role[] = JSON.parse(await this.redis.get(`${USER_ROLEKS_KEY}:${userId}`))
    if (!roleArr.map(role => role.roleKey).includes("admin")) {
      const userDeptId = await this.redis.get(`${USER_DEPTID_KEY}:${userId}`)
      const deptId = userDeptId ? userDeptId : null
      roleArr.forEach(role => {
        const dataScope = role.dataScope
        if (dataScope == '1') {  //全部数据权限
          sqlString = ''
        } else if (dataScope == '2') {  //自定义数据权限
          sqlString += ` OR ${aliaObj.deptAlias}.dept_id IN ( SELECT deptDeptId FROM role_depts_dept WHERE roleRoleId = ${role.roleId} )`
        } else if (dataScope == '3') {  //本部门数据权限
          sqlString += ` OR ${aliaObj.deptAlias}.dept_id = ${deptId}`
        } else if (dataScope == '4') {  //本部门及以下数据权限
          sqlString += ` OR ${aliaObj.deptAlias}.dept_id IN ( SELECT dept_id FROM dept WHERE concat('.',mpath) like '%.${deptId}.%')`
        } else if (dataScope == '5') {  //仅本人数据权限
          sqlString += ` OR ${aliaObj.userAlias}.user_id = ${userId}`
        }
      });
    }
    if (sqlString) {
      request.dataScope = '(' + sqlString.substring(4) + ')'
    }
  }
}
