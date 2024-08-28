import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DictData } from './dict_data.entity';

@Entity({
  name: 'dict_type',
})
export class DictType extends BaseEntity {
  /* 字典编码 */
  @PrimaryGeneratedColumn({
    name: 'dict_id',
    comment: '字典类型ID',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: '字典编码',
  })
  dictId: number;

  /* 字典名称 */
  @Column({
    name: 'dict_name',
    comment: '字典名称',
    default: '',
    length: 100,
  })
  @IsString()
  @Excel({
    name: '字典名称',
  })
  dictName: string;

  /* 字典类型 */
  @Column({
    unique: true,
    name: 'dict_type',
    comment: '字典类型',
    default: '',
    length: 100,
  })
  @IsString()
  @Excel({
    name: '字典类型',
  })
  dictType: string;

  /* 状态（0正常 1停用） */
  @Column({
    comment: '状态（0正常 1停用）',
    type: 'char',
    default: 0,
    length: 1,
  })
  @Excel({
    name: '状态',
    dictType: 'sys_normal_disable',
  })
  @IsString()
  status: string;

  @OneToMany(() => DictData, (dictData) => dictData.dictType)
  @ApiHideProperty()
  dictDatas: DictData[];
}
