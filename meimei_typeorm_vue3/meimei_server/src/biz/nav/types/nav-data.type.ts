import { ApiProperty } from '@nestjs/swagger'
export class BaseResponse {
  @ApiProperty({ description: '是否成功' })
  success: boolean
}

export class WebsiteResponse {
  @ApiProperty({ description: '网站ID' })
  id: number

  @ApiProperty({ description: '网站名称' })
  name: string

  @ApiProperty({ description: '网站描述' })
  description: string

  @ApiProperty({ description: '网站链接' })
  url: string

  @ApiProperty({ description: '背景色', required: false })
  color?: string

  @ApiProperty({ description: '排序' })
  sort: number

  @ApiProperty({ description: '分类ID' })
  categoryId: number
}

export class CategoryResponse {
  @ApiProperty({ description: '分类ID' })
  id: number

  @ApiProperty({ description: '分类名称' })
  name: string

  @ApiProperty({ description: '排序' })
  sort: number
}

export class NavDataItem {
  @ApiProperty({ description: '分类ID' })
  id: number

  @ApiProperty({ description: '分类名称' })
  name: string

  @ApiProperty({ description: '排序' })
  sort: number

  @ApiProperty({ description: '网站列表', type: [WebsiteResponse] })
  items: WebsiteResponse[]
}

export class NavResponse {
  @ApiProperty({ description: '导航数据', type: [NavDataItem] })
  data: NavDataItem[]
}
