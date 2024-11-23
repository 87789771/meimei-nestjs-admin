import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: '分类名称不能为空' })
  @Length(2, 50, { message: '分类名称长度必须在2-50个字符之间' })
  name: string

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sort?: number
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @Length(2, 50, { message: '分类名称长度必须在2-50个字符之间' })
  name?: string

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sort?: number
}
