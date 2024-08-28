import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Logininfor {
  /* 访问id */
  @PrimaryGeneratedColumn({
    name: 'info_id',
    comment: '访问ID',
  })
  infoId: number;

  /* 用户账号 */
  @Column({
    name: 'user_name',
    comment: '用户账号',
    length: 50,
    default: '',
  })
  @Excel({
    name: '用户账号',
  })
  userName: string;

  /* 登录IP地址 */
  @Column({
    name: 'ipaddr',
    comment: '登录IP地址',
    length: 128,
    default: '',
  })
  @Excel({
    name: '登录IP地址',
  })
  ipaddr: string;

  /* 登录地点 */
  @Column({
    name: 'login_location',
    comment: '登录地点',
    length: 255,
    default: '',
  })
  @Excel({
    name: '登录地点',
  })
  loginLocation: string;

  /* 浏览器类型 */
  @Column({
    name: 'browser',
    comment: '浏览器类型',
    length: 50,
    default: '',
  })
  @Excel({
    name: '浏览器类型',
  })
  browser: string;

  /* 浏览器操作系统类型 */
  @Column({
    name: 'os',
    comment: '浏览器操作系统类型',
    length: 50,
    default: '',
  })
  @Excel({
    name: '浏览器操作系统类型',
  })
  os: string;

  /* 登录状态（0成功 1失败） */
  @Column({
    name: 'status',
    comment: '登录状态（0成功 1失败）',
    length: 1,
    type: 'char',
    default: '0',
  })
  @Excel({
    name: '登录状态',
    dictType: 'sys_common_status',
  })
  status: string;

  /* 提示消息 */
  @Column({
    name: 'msg',
    comment: '提示消息',
    length: 255,
    default: '',
  })
  @Excel({
    name: '登录状态',
  })
  msg: string;

  /* 访问时间 */
  @Column({
    name: 'login_time',
    comment: '访问时间',
    type: 'datetime',
  })
  @Excel({
    name: '操作时间',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  loginTime: string;
}
