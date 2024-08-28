import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'oper_log',
})
export class OperLog {
  /* 日志主键 */
  @PrimaryGeneratedColumn({
    name: 'oper_id',
    comment: '日志主键',
  })
  operId: number;

  /* 模块标题 */
  @Column({
    name: 'title',
    comment: '模块标题',
    length: 50,
    default: '',
  })
  @Excel({
    name: '模块标题',
  })
  title: string;

  /* '业务类型 */
  @Column({
    name: 'business_type',
    comment: '业务类型',
    default: '0',
    type: 'char',
    length: 1,
  })
  @Excel({
    name: '业务类型',
    dictType: 'sys_oper_type',
  })
  businessType: string;

  /* 方法名称 */
  @Column({
    name: 'method',
    comment: '方法名称',
    length: 100,
    default: '',
  })
  @Excel({
    name: '方法名称',
  })
  method: string;

  /* 请求方式 */
  @Column({
    name: 'request_method',
    comment: '请求方式',
    length: 10,
    default: '',
  })
  @Excel({
    name: '请求方式',
  })
  requestMethod: string;

  /* 操作类别（0其它 1后台用户 2手机端用户） */
  @Column({
    name: 'operator_type',
    comment: '操作类别（0其它 1后台用户 2手机端用户）',
    default: '0',
    type: 'char',
    length: 1,
  })
  operatorType: string;

  /* 操作人员 */
  @Column({
    name: 'oper_name',
    comment: '操作人员',
    length: 50,
    default: '',
  })
  @Excel({
    name: '操作人员',
  })
  operName: string;

  /* 部门名称 */
  @Column({
    name: 'dept_name',
    comment: '部门名称',
    length: 50,
    default: '',
  })
  deptName: string;

  /* 请求URL */
  @Column({
    name: 'oper_url',
    comment: '请求URL',
    length: 255,
    default: '',
  })
  @Excel({
    name: '请求URL',
  })
  operUrl: string;

  /* 主机地址 */
  @Column({
    name: 'oper_ip',
    comment: '主机地址',
    length: 128,
    default: '',
  })
  @Excel({
    name: '主机地址',
  })
  operIp: string;

  /* 操作地点 */
  @Column({
    name: 'oper_location',
    comment: '操作地点',
    length: 255,
    default: '',
  })
  @Excel({
    name: '操作地点',
  })
  operLocation: string;

  /* 请求参数 */
  @Column({
    name: 'oper_param',
    comment: '请求参数',
    length: 2000,
    default: '',
  })
  operParam: string;

  /* 返回参数 */
  @Column({
    name: 'json_result',
    comment: '返回参数',
    length: 2000,
    default: '',
  })
  jsonResult: string;

  /* 操作状态（0正常 1异常） */
  @Column({
    name: 'status',
    comment: '操作状态（0正常 1异常）',
    default: 0,
    type: 'int',
  })
  @Excel({
    name: '操作状态',
    dictType: 'sys_common_status',
  })
  status: number;

  /* 返回参数 */
  @Column({
    name: 'errorMsg',
    comment: '返回参数',
    length: 2000,
    default: '',
  })
  errorMsg: string;

  /* 操作时间 */
  @Column({
    name: 'oper_time',
    comment: '操作时间',
    type: 'datetime',
  })
  @Excel({
    name: '操作时间',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  operTime: string;
}
