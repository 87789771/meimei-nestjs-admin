/*
https://docs.nestjs.com/controllers#controllers
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
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataObj } from 'src/common/class/data-obj.class';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { Keep } from 'src/common/decorators/keep.decorator';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { User as UserEntity } from '../user/entities/user.entity';
import {
  ReqAddRoleDto,
  ReqAllocatedListDto,
  ReqCancelAllDto,
  ReqCancelDto,
  ReqChangeStatusDto,
  ReqDataScopeDto,
  ReqRoleListDto,
  ReqUpdateRoleDto,
} from './dto/req-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@ApiTags('角色管理')
@Controller('system/role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly excelService: ExcelService,
  ) {}

  /* 新增角色 */
  @RepeatSubmit()
  @Post()
  @RequiresPermissions('system:role:add')
  @Log({
    title: '角色管理',
    businessType: BusinessTypeEnum.insert,
  })
  async add(
    @Body() reqAddRoleDto: ReqAddRoleDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddRoleDto.createBy = reqAddRoleDto.updateBy = userName;
    await this.roleService.addOrUpdate(reqAddRoleDto);
  }

  /* 分页查询角色列表 */
  @Get('list')
  @RequiresPermissions('system:role:query')
  @ApiPaginatedResponse(Role)
  async list(@Query(PaginationPipe) reqRoleListDto: ReqRoleListDto) {
    return this.roleService.list(reqRoleListDto);
  }

  /* 通过Id 查询角色 */
  @Get(':roleId')
  @RequiresPermissions('system:role:query')
  @ApiDataResponse(typeEnum.object, Role)
  async one(@Param('roleId') roleId: number) {
    const role = await this.roleService.findById(roleId);
    return DataObj.create(role);
  }

  /* 编辑角色 */
  @RepeatSubmit()
  @Put()
  @RequiresPermissions('system:role:edit')
  @Log({
    title: '角色管理',
    businessType: BusinessTypeEnum.update,
  })
  async update(
    @Body() reqUpdateRoleDto: ReqUpdateRoleDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqUpdateRoleDto.updateBy = userName;
    await this.roleService.addOrUpdate(reqUpdateRoleDto);
  }

  /* 分配数据权限 */
  @RepeatSubmit()
  @Put('dataScope')
  async dataScope(
    @Body() reqDataScopeDto: ReqDataScopeDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqDataScopeDto.updateBy = userName;
    await this.roleService.updateDataScope(reqDataScopeDto);
  }

  /* 删除角色 */
  @Delete(':roleIds')
  @RequiresPermissions('system:role:remove')
  @Log({
    title: '角色管理',
    businessType: BusinessTypeEnum.delete,
  })
  async delete(
    @Param('roleIds') roleIds: string,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    await this.roleService.delete(roleIds.split(','), userName);
  }

  /* 更改角色状态 */
  @RepeatSubmit()
  @Put('changeStatus')
  async changeStatus(
    @Body() reqChangeStatusDto: ReqChangeStatusDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    await this.roleService.changeStatus(
      reqChangeStatusDto.roleId,
      reqChangeStatusDto.status,
      userName,
    );
  }

  /* 导出角色列表 */
  @RepeatSubmit()
  @Post('export')
  @Keep()
  @Log({
    title: '角色管理',
    businessType: BusinessTypeEnum.export,
    isSaveResponseData: false,
  })
  async export(@Body(PaginationPipe) reqRoleListDto: ReqRoleListDto) {
    const { rows } = await this.roleService.list(reqRoleListDto);
    const file = await this.excelService.export(Role, rows);
    return new StreamableFile(file);
  }

  /* 分页获取角色下的用户列表 */
  @Get('authUser/allocatedList')
  @ApiPaginatedResponse(UserEntity)
  async allocatedList(@Query() reqAllocatedListDto: ReqAllocatedListDto) {
    return this.roleService.allocatedListByRoleId(reqAllocatedListDto);
  }

  /* 单个取消用户角色授权 */
  @RepeatSubmit()
  @Put('authUser/cancel')
  async cancel(@Body() reqCancelDto: ReqCancelDto) {
    const userIdArr = [reqCancelDto.userId];
    await this.roleService.cancel(reqCancelDto.roleId, userIdArr);
  }

  /* 批量取消用户角色授权 */
  @RepeatSubmit()
  @Put('authUser/cancelAll')
  async cancelAll(@Query() reqCancelAllDto: ReqCancelAllDto) {
    const userIdArr = reqCancelAllDto.userIds.split(',');
    await this.roleService.cancel(reqCancelAllDto.roleId, userIdArr);
  }

  /* 分页获取该角色下不存在的用户列表 */
  @Get('authUser/unallocatedList')
  async unallocatedList(@Query() reqAllocatedListDto: ReqAllocatedListDto) {
    return this.roleService.allocatedListByRoleId(reqAllocatedListDto, true);
  }

  /* 给角色分配用户 */
  @RepeatSubmit()
  @Put('authUser/selectAll')
  async selectAll(@Query() reqCancelAllDto: ReqCancelAllDto) {
    const userIdArr = reqCancelAllDto.userIds.split(',');
    await this.roleService.selectAll(reqCancelAllDto.roleId, userIdArr);
  }
}
