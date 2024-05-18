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
import { DataObj } from 'src/common/class/data-obj.class';
import { Keep } from 'src/common/decorators/keep.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import { JobService } from './job.service';
import {
  AddJobDto,
  AddJobLogDto,
  ChangStatusDto,
  JobListDto,
  JobLogListDto,
  JobRunDto,
  UpdateJobDto,
} from './dto/req-job.dto';
import { CreateMessagePipe } from 'src/common/pipes/createmessage.pipe';
import { UpdateMessagePipe } from 'src/common/pipes/updatemessage.pipe';
import { StringToArrPipe } from 'src/common/pipes/stringtoarr.pipe';

@Controller('monitor')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly excelService: ExcelService,
  ) {}

  /* 新增任务 */
  @RepeatSubmit()
  @Post('job')
  @RequiresPermissions('monitor:job:add')
  async addJob(@Body(CreateMessagePipe) addJobDto: AddJobDto) {
    await this.jobService.addJob(addJobDto);
  }

  /* 分页查询任务列表 */
  @Get('job/list')
  @RequiresPermissions('monitor:job:query')
  async jobList(@Query(PaginationPipe) jobListDto: JobListDto) {
    return this.jobService.jobList(jobListDto);
  }

  /* 通过id查询任务 */
  @Get('job/:jobId')
  @RequiresPermissions('monitor:job:query')
  async oneJob(@Param('jobId') jobId: number) {
    const job = await this.jobService.oneJob(jobId);
    return DataObj.create(job);
  }

  /* 编辑任务 */
  @Put('job')
  @RepeatSubmit()
  @RequiresPermissions('monitor:job:edit')
  async updataJob(@Body(UpdateMessagePipe) updateJobDto: UpdateJobDto) {
    await this.jobService.updataJob(updateJobDto);
  }

  /* 执行一次 */
  @Put('job/run')
  @RepeatSubmit()
  @RequiresPermissions('monitor:job:edit')
  async run(@Body() jobRunDto: JobRunDto) {
    await this.jobService.runOne(jobRunDto);
  }

  /* 删除任务 */
  @Delete('job/:jobIds')
  @RequiresPermissions('monitor:job:remove')
  async deleteJob(@Param('jobIds', new StringToArrPipe()) jobIds: number[]) {
    await this.jobService.deleteJob(jobIds);
  }

  /* 更改任务状态 */
  @Put('job/changeStatus')
  @RepeatSubmit()
  @RequiresPermissions('monitor:job:changeStatus')
  async changeStatus(@Body() changStatusDto: ChangStatusDto) {
    await this.jobService.changeStatus(changStatusDto);
  }

  /* 导出定时任务 */
  @RepeatSubmit()
  @Post('job/export')
  @RequiresPermissions('monitor:job:export')
  @Keep()
  async exportJob(@Body() jobListDto: JobListDto) {
    const { rows } = await this.jobService.jobList(jobListDto);
    const file = await this.excelService.export(AddJobDto, rows);
    return new StreamableFile(file);
  }

  /* 分页查询任务调度日志 */
  @Get('jobLog/list')
  async jobLogList(@Query(PaginationPipe) jobLogListDto: JobLogListDto) {
    return await this.jobService.jobLogList(jobLogListDto);
  }

  /* 清空任务调度日志 */
  @Delete('jobLog/clean')
  async cleanJobLog() {
    await this.jobService.cleanJobLog();
  }

  /* 删除任务调度日志 */
  @Delete('jobLog/:jobLogIds')
  async deleteJogLog(
    @Param('jobLogIds', new StringToArrPipe()) jobLogIds: number[],
  ) {
    await this.jobService.deleteJogLog(jobLogIds);
  }

  /* 导出定时任务日志 */
  @RepeatSubmit()
  @Post('jobLog/export')
  @Keep()
  async exportJobLog(@Body(PaginationPipe) jobLogListDto: JobLogListDto) {
    const { rows } = await this.jobService.jobLogList(jobLogListDto);
    const file = await this.excelService.export(AddJobLogDto, rows);
    return new StreamableFile(file);
  }
}
