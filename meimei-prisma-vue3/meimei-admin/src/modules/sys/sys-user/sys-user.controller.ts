/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-20 13:39:36
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-06-27 10:42:21
 * @FilePath: \meimei-prisma-vue3\meimei-admin\src\modules\sys\sys-user\sys-user.controller.ts
 * @Description:
 *
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { CreateMessagePipe } from 'src/common/pipes/createmessage.pipe';
import { StringToArrPipe } from 'src/common/pipes/stringtoarr.pipe';
import { SysUserService } from './sys-user.service';
import {
  AddSysUserDto,
  CancelAllDto,
  ChangeStatusDto,
  GetSysUserListDto,
  ImportSysUserDto,
  ResetPwdDto,
  UpdataSelfDto,
  UpdateSelfPwd,
  UpdateSupportDto,
  UpdateSysUserDto,
} from './dto/req-sys-user.dto';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UpdateMessagePipe } from 'src/common/pipes/updatemessage.pipe';
import { Keep } from 'src/common/decorators/keep.decorator';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ExportSysUserDto } from './dto/res-sys-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiException } from 'src/common/exceptions/api.exception';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { DataScope } from 'src/common/type/data-scope.type';

@Controller('system/user')
export class SysUserController {
  constructor(
    private readonly sysUserService: SysUserService,
    private readonly excelService: ExcelService,
  ) {}
  /* 新增 */
  @Post()
  @RepeatSubmit()
  @Log({
    title: '用户管理',
    businessType: BusinessTypeEnum.insert,
  })
  @RequiresPermissions('system:user:add')
  async add(@Body(CreateMessagePipe) addSysUserDto: AddSysUserDto) {
    await this.sysUserService.add(addSysUserDto);
  }

  /* 获取岗位和角色列表 */
  @Get()
  async postAndRole() {
    const [posts, roles] = await this.sysUserService.postAndRole();
    return {
      posts,
      roles,
    };
  }

  /* 分页查询 */
  @Get('list')
  @RequiresPermissions('system:user:query')
  async list(
    @Query(PaginationPipe) getSysUserListDto: GetSysUserListDto,
    @User(UserEnum.dataScope) dataScope: DataScope,
  ) {
    return await this.sysUserService.list(getSysUserListDto, dataScope);
  }

  /* 获取部门树 */
  @Get('deptTree')
  async deptTree(@User(UserEnum.dataScope) dataScope: DataScope) {
    return await this.sysUserService.treeselect(dataScope);
  }

  /* 获取用户个人信息 */
  @Get('profile')
  async profile(@User(UserEnum.userId) userId: number) {
    const user = await this.sysUserService.oneByUserId(userId);
    const { posts, roles } = user;
    const postGroup = posts.map((item) => item.postName).join('、');
    const roleGroup = roles.map((item) => item.roleName).join('、');
    return {
      data: user,
      postGroup,
      roleGroup,
    };
  }

  /* 更改个人信息 */
  @Put('profile')
  @RepeatSubmit()
  async updataMyslf(
    @Body() updataSelfDto: UpdataSelfDto,
    @User(UserEnum.userId) userId: number,
  ) {
    updataSelfDto.userId = userId;
    this.sysUserService.updataMyslf(updataSelfDto);
  }

  /* 更改个人密码 */
  @Put('profile/updatePwd')
  @RepeatSubmit()
  async updatePwd(
    @Query() updateSelfPwd: UpdateSelfPwd,
    @User(UserEnum.userId) userId: number,
  ) {
    updateSelfPwd.userId = userId;
    await this.sysUserService.updatePwd(updateSelfPwd);
  }

  /* 通过id查询 */
  @Get(':userId')
  @RequiresPermissions('system:user:query')
  async oneByUserId(@Param('userId') userId: number) {
    const user = await this.sysUserService.oneByUserId(userId);
    const [posts, roles] = await this.sysUserService.postAndRole();
    const postIds = user.posts.map((item) => item.postId);
    const roleIds = user.roles.map((item) => item.roleId);
    return {
      data: user,
      posts,
      roles,
      postIds,
      roleIds,
    };
  }

  /* 更新 */
  @Put()
  @RepeatSubmit()
  @RequiresPermissions('system:user:edit')
  @Log({
    title: '用户管理',
    businessType: BusinessTypeEnum.update,
  })
  async uplate(@Body(UpdateMessagePipe) updateSysUserDto: UpdateSysUserDto) {
    await this.sysUserService.update(updateSysUserDto);
  }

  /* 更新用户状态 */
  @Put('changeStatus')
  @RequiresPermissions('system:user:edit')
  async changeStatus(@Body() changeStatusDto: ChangeStatusDto) {
    await this.sysUserService.changeStatus(changeStatusDto);
  }

  /* 上传头像 */
  @RepeatSubmit()
  @Post('profile/avatar')
  @UseInterceptors(FileInterceptor('avatarfile'))
  async avatar(
    @UploadedFile() file: Express.Multer.File,
    @Query('fileName') fileName,
    @User(UserEnum.userId) userId: number,
  ) {
    await this.sysUserService.uploadAvatar(fileName, userId);
    return {
      imgUrl: fileName,
    };
  }

  /* 删除 */
  @Delete(':userIds')
  @RequiresPermissions('system:user:remove')
  @Log({
    title: '用户管理',
    businessType: BusinessTypeEnum.delete,
  })
  async delete(@Param('userIds', new StringToArrPipe()) userIdArr: number[]) {
    await this.sysUserService.delete(userIdArr);
  }

  /* 更新用户密码 */
  @Put('resetPwd')
  @RepeatSubmit()
  @RequiresPermissions('system:user:resetPwd')
  async resetPwd(@Body() resetPwdDto: ResetPwdDto) {
    await this.sysUserService.resetPwd(resetPwdDto);
  }

  /* 查询用户 及 所有角色列表 */
  @Get('authRole/:userId')
  @RequiresPermissions('system:user:edit')
  async authRole(@Param('userId') userId: number) {
    return await this.sysUserService.authRole(userId);
  }

  /* 给用户添加角色 */
  @Put('authRole')
  @RepeatSubmit()
  @RequiresPermissions('system:user:edit')
  async authRoleSub(@Query() cancelAllDto: CancelAllDto) {
    await this.sysUserService.cancelAll(cancelAllDto);
  }

  /* 导出 */
  @Post('export')
  @RepeatSubmit()
  @RequiresPermissions('system:user:export')
  @Log({
    title: '用户管理',
    businessType: BusinessTypeEnum.export,
  })
  @Keep()
  async export(
    @Body() getSysUserListDto: GetSysUserListDto,
    @User(UserEnum.dataScope) dataScope: DataScope,
  ) {
    const { rows } = await this.sysUserService.list(
      getSysUserListDto,
      dataScope,
    );
    const file = await this.excelService.export(ExportSysUserDto, rows);
    return new StreamableFile(file);
  }

  /* 下载模板 */
  @RepeatSubmit()
  @Post('importTemplate')
  @Keep()
  async importTemplate() {
    const file = await this.excelService.importTemplate(ImportSysUserDto);
    return new StreamableFile(file);
  }

  /* 用户导入 */
  @Post('importData')
  @RepeatSubmit()
  @RequiresPermissions('system:user:import')
  @UseInterceptors(FileInterceptor('file'))
  async importData(
    @Query() updateSupportDto: UpdateSupportDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5,
        })
        .addFileTypeValidator({
          fileType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        .build({
          exceptionFactory: (error) => {
            throw new ApiException(
              '文件格式错误！ 文件最大为5M，且必须是 xlsx 格式',
            );
          },
        }),
    )
    file: Express.Multer.File,
  ) {
    const data = await this.excelService.import<ImportSysUserDto>(
      ImportSysUserDto,
      file,
    );
    await this.sysUserService.importData(data, updateSupportDto.updateSupport);
  }
}
