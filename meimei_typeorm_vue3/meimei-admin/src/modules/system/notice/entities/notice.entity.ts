import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'notice_id',
    comment: '公告id',
  })
  @Type()
  @IsNumber()
  noticeId: number;

  @Column({
    name: 'notice_title',
    comment: '公告标题',
    length: 50,
  })
  @IsString()
  noticeTitle: string;

  @Column({
    name: 'notice_type',
    comment: '公告类型（1通知 2公告）',
    type: 'char',
    length: 1,
  })
  @IsString()
  noticeType: string;

  @Column({
    name: 'notice_content',
    comment: '公告内容',
    type: 'longtext',
    default: null,
  })
  @IsOptional()
  @Type()
  @IsString()
  noticeContent: string;

  @Column({
    name: 'status',
    comment: '公告状态（0正常 1关闭）',
    type: 'char',
    default: '0',
    length: 1,
  })
  @IsString()
  status: string;
}
