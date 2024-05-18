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
import { SysPostService } from './sys-post.service';
import {
  AddSysPostDto,
  GetSysPostListDto,
  UpdateSysPostDto,
} from './dto/req-sys-post.dto';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { DataObj } from 'src/common/class/data-obj.class';
import { UpdateMessagePipe } from 'src/common/pipes/updatemessage.pipe';
import { Keep } from 'src/common/decorators/keep.decorator';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { ExportSysPostDto } from './dto/res-sys-post.dto';

@Controller('system/post')
export class SysPostController {
  constructor(
    private readonly sysPostService: SysPostService,
    private readonly excelService: ExcelService,
  ) {}
  /* 新增 */
  @Post()
  @RepeatSubmit()
  @Log({
    title: '岗位管理',
    businessType: BusinessTypeEnum.insert,
  })
  @RequiresPermissions('system:post:add')
  async add(@Body(CreateMessagePipe) addSysPostDto: AddSysPostDto) {
    await this.sysPostService.add(addSysPostDto);
  }

  /* 分页查询 */
  @Get('list')
  @RequiresPermissions('system:post:query')
  async list(@Query(PaginationPipe) getSysPostListDto: GetSysPostListDto) {
    return await this.sysPostService.list(getSysPostListDto);
  }

  /* 通过id查询 */
  @Get(':postId')
  @RequiresPermissions('system:post:query')
  async oneByPostId(@Param('postId') postId: number) {
    const post = await this.sysPostService.oneByPostId(postId);
    return DataObj.create(post);
  }

  /* 更新 */
  @Put()
  @RepeatSubmit()
  @RequiresPermissions('system:post:edit')
  @Log({
    title: '岗位管理',
    businessType: BusinessTypeEnum.update,
  })
  async uplate(@Body(UpdateMessagePipe) updateSysPostDto: UpdateSysPostDto) {
    await this.sysPostService.update(updateSysPostDto);
  }

  /* 删除 */
  @Delete(':postIds')
  @RequiresPermissions('system:post:remove')
  @Log({
    title: '岗位管理',
    businessType: BusinessTypeEnum.delete,
  })
  async delete(@Param('postIds', new StringToArrPipe()) postIdArr: number[]) {
    await this.sysPostService.delete(postIdArr);
  }

  /* 导出 */
  @RepeatSubmit()
  @Post('export')
  @RequiresPermissions('system:post:export')
  @Log({
    title: '岗位管理',
    businessType: BusinessTypeEnum.export,
  })
  @Keep()
  async export(@Body() getSysPostListDto: GetSysPostListDto) {
    const { rows } = await this.sysPostService.list(getSysPostListDto);
    const file = await this.excelService.export(ExportSysPostDto, rows);
    return new StreamableFile(file);
  }
}
