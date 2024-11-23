import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { BaseEntity } from 'src/common/entities/base.entity'
import { Excel } from 'src/modules/common/excel/excel.decorator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'biz_nav_website' })
export class Website extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '网站ID' })
  @Type()
  @IsNumber()
  id: number

  @Column({ length: 100, comment: '网站名称' })
  @IsString()
  name: string

  @Column({ length: 200, comment: '网站描述', default: '' })
  @IsString()
  description: string

  @Column({ length: 255, comment: '网站链接' })
  @IsString()
  url: string

  @Column({ length: 7, nullable: true, comment: '图标背景色' })
  @IsString()
  @IsOptional()
  color?: string

  @Column({ comment: '排序', default: 0 })
  @IsNumber()
  sort: number

  @Column({ comment: '分类ID' })
  @IsNumber()
  categoryId: number
}
