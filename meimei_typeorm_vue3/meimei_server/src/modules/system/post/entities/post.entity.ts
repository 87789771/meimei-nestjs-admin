import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post extends BaseEntity {
  /* 岗位ID */
  @PrimaryGeneratedColumn({
    name: 'post_id',
    comment: '岗位ID',
  })
  @Type()
  @IsNumber()
  @Excel({
    name: '岗位ID',
  })
  postId: number;

  /* 岗位编码 */
  @Column({
    unique: true,
    name: 'post_code',
    comment: '岗位编码',
    length: 64,
  })
  @IsString()
  @Excel({
    name: '岗位编码',
  })
  postCode: string;

  /* 岗位名称 */
  @Column({
    name: 'post_name',
    comment: '岗位名称',
    length: 50,
  })
  @IsString()
  @Excel({
    name: '岗位名称',
  })
  postName: string;

  /* 显示顺序 */
  @Column({
    name: 'post_sort',
    comment: '显示顺序',
  })
  @IsNumber()
  @Excel({
    name: '显示顺序',
  })
  postSort: number;

  /* 状态（0正常 1停用 */
  @Column({
    name: 'status',
    comment: '状态（0正常 1停用）',
    length: 1,
    type: 'char',
  })
  @IsString()
  @Excel({
    name: '状态',
    dictType: 'sys_normal_disable',
  })
  status: string;

  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.posts)
  users: User[];
}
