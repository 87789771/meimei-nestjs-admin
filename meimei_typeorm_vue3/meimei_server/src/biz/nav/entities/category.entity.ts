import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { BaseEntity } from 'src/common/entities/base.entity'
import { Excel } from 'src/modules/common/excel/excel.decorator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'biz_nav_category' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '分类ID' })
  @Type()
  @IsNumber()
  id: number

  @Column({ length: 50, comment: '分类名称和图标' })
  @IsString()
  @Length(2, 50, { message: '分类名称长度必须在2-50个字符之间' })
  name: string

  @Column({ comment: '排序', default: 0 })
  @IsNumber()
  sort: number
}
