import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'job_log',
})
export class JobLog {
  /* 任务日志ID */
  @PrimaryGeneratedColumn({
    name: 'job_log_id',
    comment: '任务日志ID',
  })
  @Type()
  @IsNumber()
  jobLogId: number;

  /* 任务名称 */
  @Column({
    name: 'job_name',
    comment: '任务名称',
    length: 64,
  })
  @IsString()
  @Excel({
    name: '任务名称',
  })
  jobName: string;

  /* 任务组名 */
  @Column({
    name: 'job_group',
    comment: '任务组名',
    length: 64,
  })
  @IsString()
  @Excel({
    name: '任务组名',
    dictType: 'sys_job_group',
  })
  jobGroup: string;

  /* 调用目标字符串 */
  @Column({
    name: 'invoke_target',
    comment: '调用目标字符串',
    length: 500,
  })
  @IsString()
  @Excel({
    name: '调用目标字符串',
  })
  invokeTarget: string;

  /* 日志信息 */
  @Column({
    name: 'job_message',
    comment: '日志信息',
    length: 500,
    default: null,
  })
  @IsString()
  @Excel({
    name: '日志信息',
  })
  jobMessage: string;

  /* 执行状态（0正常 1失败） */
  @Column({
    name: 'status',
    comment: '执行状态（0正常 1失败）',
    default: '0',
    type: 'char',
    length: 1,
  })
  @IsString()
  @Excel({
    name: '执行状态',
    dictType: 'sys_common_status',
  })
  status: string;

  /* 异常信息 */
  @Column({
    name: 'exception_info',
    comment: '异常信息',
    length: 2000,
    default: '',
  })
  @IsString()
  @Excel({
    name: '异常信息',
  })
  exceptionInfo: string;

  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  @Excel({
    name: '创建时间',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  createTime: Date | string;
}
