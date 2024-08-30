import { OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Dept } from '../entities/dept.entity'

export class ReqDeptListDto {
  /* 部门名称 */
  @IsOptional()
  @IsString()
  deptName?: string

  /* 状态 */
  @IsOptional()
  @IsString()
  status?: string
}

export class ReqAddDeptDto extends OmitType(Dept, ['deptId'] as const) {
  /* 父部门Id */
  @Type()
  @IsNumber()
  parentId: number
}

export class ReqUpdateDept extends Dept {
  /* 父部门Id */
  @Type()
  @IsNumber()
  parentId: number
}
