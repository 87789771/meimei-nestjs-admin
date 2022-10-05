import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { Job } from '../entities/job.entity';

/* 新增任务列表 */
export class ReqAddJob extends OmitType(Job, ['jobId'] as const) {}

/* 分页查询任务列表 */
export class ReqJobListDto extends PaginationDto {
  /* 任务名称 */
  @IsOptional()
  @IsString()
  jobName?: string;

  /* 任务组名 */
  @IsOptional()
  @IsString()
  jobGroup?: string;

  /* 任务状态 */
  @IsOptional()
  @IsString()
  status?: string;
}

/* 更新任务状态 */
export class ReqChangStatusDto {
  /* 任务id */
  @Type()
  @IsNumber()
  jobId: number;

  /* 状态 */
  @Type()
  @IsString()
  status: string;
}

/* 分页查询任务调度日志 */
export class ReqJobLogList extends PaginationDto {
  /* 任务名称 */
  @IsOptional()
  @IsString()
  jobName?: string;

  /* 任务组名 */
  @IsOptional()
  @IsString()
  jobGroup?: string;

  /* 执行状态 */
  @IsOptional()
  @IsString()
  status?: string;

  /* 执行时间 */
  @IsOptional()
  @IsObject()
  params?: ParamsDto;
}

/* 执行一次任务 */
export class ReqJobRunDto {
  /* 分组 */
  @IsString()
  jobGroup: string;

  /* 任务id */
  @IsNumber()
  jobId: number;
}
