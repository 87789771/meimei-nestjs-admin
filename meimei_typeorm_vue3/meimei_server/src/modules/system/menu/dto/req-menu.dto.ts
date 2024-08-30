import { OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Menu } from '../entities/menu.entity'

export class ReqMenuListDto {
  /* 菜单名称 */
  @IsOptional()
  @IsString()
  menuName?: string

  /* 状态 */
  @IsOptional()
  @IsString()
  status?: string
}

export class ReqAddMenuDto extends OmitType(Menu, ['menuId'] as const) {
  /* 父部门Id */
  @Type()
  @IsNumber()
  parentId: number
}

export class ReqUpdateMenu extends Menu {
  /* 父部门Id */
  @Type()
  @IsNumber()
  parentId: number
}
