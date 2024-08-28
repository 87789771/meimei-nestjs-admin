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
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';
import { ExcelService } from 'src/modules/common/excel/excel.service';
import {
  ReqAddJob,
  ReqChangStatusDto,
  ReqJobListDto,
  ReqJobLogList,
  ReqJobRunDto,
} from './dto/req-job.dto';
import { Job } from './entities/job.entity';
import { JobLog } from './entities/job_log.entity';
import { JobService } from './job.service';

@ApiTags('任务管理')
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
  async addJob(
    @Body() reqAddJob: ReqAddJob,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddJob.createBy = reqAddJob.updateBy = userName;
    await this.jobService.addJob(reqAddJob);
  }

  /* 分页查询任务列表 */
  @Get('job/list')
  @RequiresPermissions('monitor:job:query')
  @ApiPaginatedResponse(Job)
  async jobList(@Query(PaginationPipe) reqJobListDto: ReqJobListDto) {
    return this.jobService.jobList(reqJobListDto);
  }

  /* 通过id查询任务 */
  @Get('job/:jobId')
  @RequiresPermissions('monitor:job:query')
  @ApiDataResponse(typeEnum.object, Job)
  async oneJob(@Param('jobId') jobId: number) {
    const job = await this.jobService.oneJob(jobId);
    return DataObj.create(job);
  }

  /* 编辑任务 */
  @RepeatSubmit()
  @Put('job')
  @RequiresPermissions('monitor:job:edit')
  async updataJob(
    @Body() job: Job,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    job.updateBy = userName;
    await this.jobService.updataJob(job);
  }

  /* 执行一次 */
  @RepeatSubmit()
  @Put('job/run')
  @RequiresPermissions('monitor:job:edit')
  async run(@Body() reqJobRunDto: ReqJobRunDto) {
    const job = await this.jobService.oneJob(reqJobRunDto.jobId);
    await this.jobService.once(job);
  }

  /* 删除任务 */
  @Delete('job/:jobIds')
  @RequiresPermissions('monitor:job:remove')
  async deleteJob(@Param('jobIds') jobIds: string) {
    await this.jobService.deleteJob(jobIds.split(','));
  }

  /* 更改任务状态 */
  @RepeatSubmit()
  @Put('job/changeStatus')
  @RequiresPermissions('monitor:job:changeStatus')
  async changeStatus(
    @Body() reqChangStatusDto: ReqChangStatusDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    await this.jobService.changeStatus(reqChangStatusDto, userName);
  }

  /* 导出定时任务 */
  @RepeatSubmit()
  @Post('job/export')
  @RequiresPermissions('monitor:job:export')
  @Keep()
  async exportJob(@Body(PaginationPipe) reqJobListDto: ReqJobListDto) {
    const { rows } = await this.jobService.jobList(reqJobListDto);
    const file = await this.excelService.export(Job, rows);
    return new StreamableFile(file);
  }

  /* 分页查询任务调度日志 */
  @Get('jobLog/list')
  @ApiPaginatedResponse(JobLog)
  async jobLogList(@Query(PaginationPipe) reqJobLogList: ReqJobLogList) {
    return await this.jobService.jobLogList(reqJobLogList);
  }

  /* 清空任务调度日志 */
  @Delete('jobLog/clean')
  async cleanJobLog() {
    await this.jobService.cleanJobLog();
  }

  /* 删除任务调度日志 */
  @Delete('jobLog/:jobLogIds')
  async deleteJogLog(@Param('jobLogIds') jobLogIds: string) {
    await this.jobService.deleteJogLog(jobLogIds.split(','));
  }

  /* 导出定时任务日志 */
  @RepeatSubmit()
  @Post('jobLog/export')
  @Keep()
  async exportJobLog(@Body(PaginationPipe) reqJobLogList: ReqJobLogList) {
    const { rows } = await this.jobService.jobLogList(reqJobLogList);
    const file = await this.excelService.export(JobLog, rows);
    return new StreamableFile(file);
  }
}
