/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-05-12 17:35:00
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-13 20:41:54
 * @FilePath: /meimei-new/src/modules/sys/sys-menu/sys-menu.controller.ts
 * @Description:
 *
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SysMenuService } from './sys-menu.service';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { CreateMessagePipe } from 'src/common/pipes/createmessage.pipe';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { DataObj } from 'src/common/class/data-obj.class';
import { UpdateMessagePipe } from 'src/common/pipes/updatemessage.pipe';
import {
  AddSysMenuDto,
  GetSysMenuListDto,
  UpdateSysMenuDto,
} from './dto/req-sys-menu.dto';

@Controller('system/menu')
export class SysMenuController {
  constructor(private readonly sysMenuService: SysMenuService) {}
  /* 新增 */
  @Post()
  @RepeatSubmit()
  @Log({
    title: '菜单管理',
    businessType: BusinessTypeEnum.insert,
  })
  @RequiresPermissions('system:menu:add')
  async add(@Body(CreateMessagePipe) addSysMenuDto: AddSysMenuDto) {
    await this.sysMenuService.add(addSysMenuDto);
  }

  /* 列表查询 */
  @Get('list')
  @RequiresPermissions('system:menu:query')
  async list(@Query() getSysMenuListDto: GetSysMenuListDto) {
    return await this.sysMenuService.list(getSysMenuListDto);
  }

  /* 获取菜单树 */
  @Get('treeselect')
  async treeselect() {
    return await this.sysMenuService.treeselect();
  }

  /* 通过id查询 */
  @Get(':menuId')
  @RequiresPermissions('system:menu:query')
  async oneByMenuId(@Param('menuId') menuId: number) {
    const post = await this.sysMenuService.oneByMenuId(menuId);
    return DataObj.create(post);
  }

  /* 更新 */
  @Put()
  @RepeatSubmit()
  @RequiresPermissions('system:menu:edit')
  @Log({
    title: '菜单管理',
    businessType: BusinessTypeEnum.update,
  })
  async uplate(@Body(UpdateMessagePipe) updateSysMenuDto: UpdateSysMenuDto) {
    await this.sysMenuService.update(updateSysMenuDto);
  }

  /* 删除 */
  @Delete(':menuIds')
  @RequiresPermissions('system:menu:remove')
  @Log({
    title: '菜单管理',
    businessType: BusinessTypeEnum.delete,
  })
  async delete(@Param('menuIds') menuId: number) {
    await this.sysMenuService.delete(menuId);
  }

  /* 获取角色对应的菜单和菜单列表 */
  @Get('roleMenuTreeselect/:roleId')
  async roleMenuTreeselect(@Param('roleId') roleId: number) {
    const menus = await this.sysMenuService.treeselect();
    const checkedKeys = await this.sysMenuService.getRoleMenu(roleId);
    return {
      menus,
      checkedKeys,
    };
  }
}
