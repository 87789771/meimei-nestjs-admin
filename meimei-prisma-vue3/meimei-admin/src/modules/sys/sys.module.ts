/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-13 13:59:22
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 15:44:23
 * @FilePath: \meimei-new\src\modules\sys\sys.module.ts
 * @Description: 
 * 
 */
import { Module } from '@nestjs/common';
import { SysUserModule } from './sys-user/sys-user.module';
import { SysConfigModule } from './sys-config/sys-config.module';
import { SysDictModule } from './sys-dict/sys-dict.module';
import { SysNoticeModule } from './sys-notice/sys-notice.module';
import { SysPostModule } from './sys-post/sys-post.module';
import { SysDeptModule } from './sys-dept/sys-dept.module';
import { SysMenuModule } from './sys-menu/sys-menu.module';
import { SysRoleModule } from './sys-role/sys-role.module';
import { SysTableModule } from './sys-table/sys-table.module';
import { SysWebModule } from './sys-web/sys-web.module';

@Module({
  imports: [
    SysUserModule,
    SysConfigModule,
    SysDictModule,
    SysNoticeModule,
    SysPostModule,
    SysDeptModule,
    SysMenuModule,
    SysRoleModule,
    SysTableModule,
    SysWebModule
  ],
})
export class SysModule {}
