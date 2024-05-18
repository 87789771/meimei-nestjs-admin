import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { CreateMessagePipe } from 'src/common/pipes/createmessage.pipe';
import { StringToArrPipe } from 'src/common/pipes/stringtoarr.pipe';
import { SysRoleService } from './sys-role.service';
import {
  AddSysRoleDto,
  AllocatedListDto,
  CancelAllDto,
  CancelDto,
  ChangeStatusDto,
  DataScopeDto,
  GetSysRoleListDto,
  UpdateSysRoleDto,
} from './dto/req-sys-role.dto';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { DataObj } from 'src/common/class/data-obj.class';
import { UpdateMessagePipe } from 'src/common/pipes/updatemessage.pipe';
import { Keep } from 'src/common/decorators/keep.decorator';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ExportSysRoleDto } from './dto/res-sys-role.dto';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { DataScope } from 'src/common/type/data-scope.type';

@Controller('system/role')
export class SysRoleController {
  constructor(
    private readonly sysRoleService: SysRoleService,
    private readonly excelService: ExcelService,
  ) {}
  /* 新增 */
  @Post()
  @RepeatSubmit()
  @Log({
    title: '角色管理',
    businessType: BusinessTypeEnum.insert,
  })
  @RequiresPermissions('system:role:add')
  async add(@Body(CreateMessagePipe) addSysRoleDto: AddSysRoleDto) {
    await this.sysRoleService.add(addSysRoleDto);
  }

  /* 分页查询 */
  @Get('list')
  @RequiresPermissions('system:role:query')
  async list(@Query(PaginationPipe) getSysRoleListDto: GetSysRoleListDto) {
    return await this.sysRoleService.list(getSysRoleListDto);
  }

  /* 通过id查询 */
  @Get(':roleId')
  @RequiresPermissions('system:role:query')
  async oneByRoleId(@Param('roleId') roleId: number) {
    const role = await this.sysRoleService.oneByRoleId(roleId);
    return DataObj.create(role);
  }

  /* 获取角色数据权限 */
  @Get('deptTree/:roleId')
  async deptTree(@Param('roleId') roleId: number) {
    const depts = await this.sysRoleService.treeselect();
    const checkedKeys = await this.sysRoleService.getRoleDept(roleId);
    return {
      depts,
      checkedKeys,
    };
  }

  /* 更新 */
  @Put()
  @RepeatSubmit()
  @RequiresPermissions('system:role:edit')
  @Log({
    title: '角色管理',
    businessType: BusinessTypeEnum.update,
  })
  async uplate(@Body(UpdateMessagePipe) updateSysRoleDto: UpdateSysRoleDto) {
    await this.sysRoleService.update(updateSysRoleDto);
  }

  /* 更新角色状态 */
  @Put('changeStatus')
  @RequiresPermissions('system:role:edit')
  async changeStatus(@Body() changeStatusDto: ChangeStatusDto) {
    await this.sysRoleService.changeStatus(changeStatusDto);
  }

  /* 更新数据权限 */
  @Put('dataScope')
  @RepeatSubmit()
  @RequiresPermissions('system:role:edit')
  @Log({
    title: '角色管理',
    businessType: BusinessTypeEnum.update,
  })
  async dataScope(@Body(UpdateMessagePipe) dataScopeDto: DataScopeDto) {
    await this.sysRoleService.dataScope(dataScopeDto);
  }

  /* 删除 */
  @Delete(':roleIds')
  @RequiresPermissions('system:role:remove')
  @Log({
    title: '角色管理',
    businessType: BusinessTypeEnum.delete,
  })
  async delete(@Param('roleIds', new StringToArrPipe()) roleIdArr: number[]) {
    await this.sysRoleService.delete(roleIdArr);
  }

  /* 导出 */
  @RepeatSubmit()
  @Post('export')
  @RequiresPermissions('system:role:export')
  @Log({
    title: '角色管理',
    businessType: BusinessTypeEnum.export,
  })
  @Keep()
  async export(@Body() getSysRoleListDto: GetSysRoleListDto) {
    const { rows } = await this.sysRoleService.list(getSysRoleListDto);
    const file = await this.excelService.export(ExportSysRoleDto, rows);
    return new StreamableFile(file);
  }

  /* 分页查询角色下用户 */
  @Get('authUser/allocatedList')
  async allocatedList(
    @Query(PaginationPipe) allocatedListDto: AllocatedListDto,
    @User(UserEnum.dataScope) dataScope: DataScope,
  ) {
    return await this.sysRoleService.allocatedList(allocatedListDto, dataScope);
  }

  /* 分页查询角色还没有的用户 */
  @Get('authUser/unallocatedList')
  async unallocatedList(
    @Query(PaginationPipe) allocatedListDto: AllocatedListDto,
    @User(UserEnum.dataScope) dataScope: DataScope,
  ) {
    return await this.sysRoleService.unallocatedList(
      allocatedListDto,
      dataScope,
    );
  }

  /* 批量给角色添加用户 */
  @Put('authUser/selectAll')
  async selectAll(@Query() cancelAllDto: CancelAllDto) {
    const { roleId, userIds } = cancelAllDto;
    const userIdArr = userIds
      .split(',')
      .map((userId) => ({ userId: Number(userId) }));
    return await this.sysRoleService.selectAll(roleId, userIdArr);
  }

  /* 批量取消授权 */
  @Put('authUser/cancelAll')
  async cancelAll(@Query() cancelAllDto: CancelAllDto) {
    const { roleId, userIds } = cancelAllDto;
    const userIdArr = userIds
      .split(',')
      .map((userId) => ({ userId: Number(userId) }));
    return await this.sysRoleService.cancelAll(roleId, userIdArr);
  }

  /* 单个给用户取消角色授权 */
  @Put('authUser/cancel')
  async cancel(@Body() cancelDto: CancelDto) {
    return await this.sysRoleService.cancel(cancelDto);
  }
}
