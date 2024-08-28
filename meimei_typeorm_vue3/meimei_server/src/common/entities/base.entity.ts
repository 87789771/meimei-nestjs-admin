/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:06:20
 * @LastEditTime: 2022-10-27 22:53:37
 * @LastEditors: Please set LastEditors
 * @Description: 数据库基类
 * @FilePath: /meimei-admin/src/common/entities/base.entity.ts
 * You can you up，no can no bb！！
 */
import { IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { ExcelTypeEnum } from 'src/modules/common/excel/excel.enum';

export class BaseEntity {
  /* 创建时间 */
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  @ApiHideProperty()
  @Excel({
    name: '创建时间',
    type: ExcelTypeEnum.EXPORT,
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    sort: 100,
  })
  createTime: Date | string;

  /* 更新时间 */
  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  @ApiHideProperty()
  updateTime: Date | string;

  /* 创建人 */
  @Column({ name: 'create_by', comment: '创建人', length: 30, default: '' })
  @ApiHideProperty()
  @Excel({
    name: '创建人',
    type: ExcelTypeEnum.EXPORT,
    sort: 101,
  })
  createBy: string;

  /* 更新人 */
  @Column({ name: 'update_by', comment: '更新人', length: 30, default: '' })
  @ApiHideProperty()
  updateBy: string;

  /* 备注 */
  @Column({ name: 'remark', comment: '备注', default: '' })
  @IsOptional()
  @IsString()
  @Excel({
    name: '备注',
    sort: 102,
  })
  remark?: string;

  /* 版本号（首次插入或更新时会自增） */
  @VersionColumn({ name: 'version', comment: '版本号', select: false })
  @ApiHideProperty()
  version?: number;
}
