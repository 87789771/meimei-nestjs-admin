import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, IsUrl, Matches } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateWebsiteDto {
  @IsString()
  @IsNotEmpty({ message: '网站名称不能为空' })
  @Length(2, 100, { message: '网站名称长度必须在2-100个字符之间' })
  name: string

  @IsString()
  @IsOptional()
  // @IsNotEmpty({ message: '网站描述不能为空' })
  @Length(2, 200, { message: '网站描述长度必须在2-200个字符之间' })
  description?: string

  @IsString()
  @IsNotEmpty({ message: '网站链接不能为空' })
  @IsUrl({}, { message: '请输入有效的URL地址' })
  url: string

  @IsString()
  @IsOptional()
  @Length(7, 7, { message: '颜色代码长度必须为7个字符' })
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: '颜色代码格式不正确，例如: #FF0000',
    each: false,
  })
  color?: string

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sort?: number

  @IsNumber()
  @IsNotEmpty({ message: '分类ID不能为空' })
  @Type(() => Number)
  categoryId: number
}

export class UpdateWebsiteDto {
  @IsString()
  @IsOptional()
  @Length(2, 100, { message: '网站名称长度必须在2-100个字符之间' })
  name?: string

  @IsString()
  @IsOptional()
  @Length(0, 200, { message: '网站描述长度必须在2-200个字符之间' })
  description?: string

  @IsString()
  @IsOptional()
  @IsUrl({}, { message: '请输入有效的URL地址' })
  url?: string

  @IsString()
  @IsOptional()
  @Length(7, 7, { message: '颜色代码长度必须为7个字符' })
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: '颜色代码格式不正确，例如: #FF0000',
    each: false,
  })
  color?: string

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sort?: number

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number

  @IsOptional()
  @IsString()
  remark?: string
}
