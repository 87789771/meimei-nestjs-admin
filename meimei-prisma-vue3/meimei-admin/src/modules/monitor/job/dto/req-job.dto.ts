import { Transform, Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { DataBaseDto } from 'src/common/dto/data-base.dto';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { transformDate } from 'src/common/func/transform-date.func';

/* 新增任务列表 */
export class AddJobDto extends DataBaseDto {
  /* 任务名称 */
  @IsString()
  @Excel({
    name: '任务名称',
  })
  jobName: string;

  /* 任务组名 */
  @IsOptional()
  @IsString()
  @Excel({
    name: '任务组名',
    dictType: 'sys_job_group',
  })
  jobGroup: string;

  /* 调用目标字符串 */
  @IsString()
  @Excel({
    name: '调用目标字符串',
  })
  invokeTarget: string;

  /* cron执行表达式 */
  @Excel({
    name: 'cron执行表达式',
  })
  @IsString()
  cronExpression: string;

  /* 计划执行错误策略（1立即执行 2执行一次 3放弃执行） */
  @Type()
  @IsString()
  @Excel({
    name: '计划执行错误策略',
    readConverterExp: {
      1: '立即执行',
      2: '执行一次',
      3: '放弃执行',
    },
  })
  misfirePolicy: string;

  /* 是否并发执行（0允许 1禁止） */
  @Type()
  @IsString()
  concurrent: string;

  /* 状态（0正常 1暂停） */
  @IsString()
  @Excel({
    name: '状态',
    dictType: 'sys_job_status',
  })
  status: string;
}

/* 编辑任务 */
export class UpdateJobDto extends AddJobDto {
  /* 任务Id */
  @IsNumber()
  jobId: number;
}

/* 分页查询任务列表 */
export class JobListDto extends PaginationDto {
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
export class ChangStatusDto {
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
export class JobLogListDto extends PaginationDto {
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
  @Transform(({ value }) => transformDate(value))
  params?: ParamsDto = {};
}

/* 执行一次任务 */
export class JobRunDto {
  /* 分组 */
  @IsString()
  jobGroup: string;

  /* 任务id */
  @IsNumber()
  jobId: number;
}

export class AddJobLogDto {
  /* 任务名称 */
  @IsString()
  @Excel({
    name: '任务名称',
  })
  jobName: string;

  /* 任务组名 */
  @IsString()
  @Excel({
    name: '任务组名',
    dictType: 'sys_job_group',
  })
  jobGroup: string;

  /* 调用目标字符串 */
  @IsString()
  @Excel({
    name: '调用目标字符串',
  })
  invokeTarget: string;

  /* 日志信息 */
  @IsString()
  @Excel({
    name: '日志信息',
  })
  jobMessage: string;

  /* 执行状态（0正常 1失败） */
  @IsString()
  @Excel({
    name: '执行状态',
    dictType: 'sys_common_status',
  })
  status: string;

  /* 异常信息 */
  @IsString()
  @Excel({
    name: '异常信息',
  })
  exceptionInfo: string;

  @Excel({
    name: '创建时间',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  createTime: Date | string;
}
