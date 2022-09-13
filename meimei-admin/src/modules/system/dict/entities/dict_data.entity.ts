import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DictType } from './dict_type.entity';

@Entity({
  name: 'dict_data',
})
export class DictData extends BaseEntity {
  /* 字典编码 */
  @PrimaryGeneratedColumn({
    name: 'dict_data',
    comment: '字典编码',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: '字典编码',
  })
  dictCode: number;

  /* 字典排序 */
  @Column({
    name: 'dict_sort',
    comment: '字典排序',
    default: 0,
  })
  @IsNumber()
  @Excel({
    name: '字典排序',
  })
  dictSort: number;

  /* 字典标签 */
  @Column({
    name: 'dict_label',
    length: '100',
    default: '',
    comment: '字典标签',
  })
  @IsString()
  @Excel({
    name: '字典标签',
  })
  dictLabel: string;

  /* 字典键值 */
  @Column({
    name: 'dict_value',
    length: '100',
    default: '',
    comment: '字典键值',
  })
  @IsString()
  @Excel({
    name: '字典键值',
  })
  dictValue: string;

  /* 样式属性（其他样式扩展） */
  @Column({
    name: 'css_class',
    length: '100',
    nullable: true,
    default: null,
    comment: '样式属性（其他样式扩展）',
  })
  @IsOptional()
  @IsString()
  @Excel({
    name: '样式属性（其他样式扩展）',
  })
  cssClass?: string;

  /* 表格回显样式 */
  @Column({
    name: 'list_class',
    length: '100',
    nullable: true,
    default: null,
    comment: '表格回显样式',
  })
  @IsOptional()
  @IsString()
  @Excel({
    name: '表格回显样式',
  })
  listClass?: string;

  /* 是否默认（Y是 N否） */
  @Column({
    name: 'is_default',
    length: '1',
    type: 'char',
    default: 'N',
    comment: '是否默认（Y是 N否）',
  })
  @IsOptional()
  @IsString()
  isDefault?: string;

  /* 状态（0正常 1停用） */
  @Column({
    length: '1',
    type: 'char',
    default: '0',
    comment: '状态（0正常 1停用）',
  })
  @Excel({
    name: '状态',
    dictType: 'sys_normal_disable',
  })
  @IsString()
  status: string;

  /* 字典类型 */
  @ManyToOne(() => DictType, (dictType) => dictType.dictDatas)
  dictType: DictType;
}
