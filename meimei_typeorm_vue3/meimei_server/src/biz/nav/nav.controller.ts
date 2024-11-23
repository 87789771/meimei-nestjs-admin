import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseArrayPipe, ParseIntPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger'
import { DataObj } from 'src/common/class/data-obj.class'
import { ApiDataResponse, typeEnum } from 'src/common/decorators/api-data-response.decorator'
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator'
import { PaginationPipe } from 'src/common/pipes/pagination.pipe'
import { PaginationDto } from 'src/common/dto/pagination.dto'
import { NavService } from './nav.service'
import { Category, Website } from './entities'
import { CreateCategoryDto, UpdateCategoryDto, CreateWebsiteDto, UpdateWebsiteDto } from './dto'
import { CategoryResponse, NavDataItem, BaseResponse, WebsiteResponse } from './types/nav-data.type'
import { Public } from 'src/common/decorators/public.decorator'

@ApiTags('导航管理')
@ApiBearerAuth()
@Controller('nav')
export class NavController {
  constructor(private readonly navService: NavService) {}

  @Public()
  @Get('data')
  @ApiOperation({ summary: '获取前端展示的导航数据' })
  @ApiDataResponse(typeEnum.objectArr, NavDataItem)
  async getNavData() {
    const data = await this.navService.getFullNavData()
    return DataObj.create(data)
  }

  // @Get('categories')
  // @ApiOperation({ summary: '获取分类列表' })
  // @ApiDataResponse(typeEnum.objectArr, CategoryResponse)
  // async getCategories() {
  //   const categories = await this.navService.getCategoriesPaging()
  //   return DataObj.create({
  //     rows: categories[0],
  //     total: categories[1],
  //   })
  // }

  @Get('categories')
  @ApiOperation({ summary: '分页获取分类列表' })
  @ApiDataResponse(typeEnum.objectArr, CategoryResponse)
  async getCategoriesPaging(@Query(PaginationPipe) paginationDto: PaginationDto) {
    const categories = await this.navService.getCategoriesPaging(paginationDto)
    return DataObj.create({
      rows: categories[0],
      total: categories[1],
    })
  }

  @Get('categories/:id')
  @ApiOperation({ summary: '获取分类详情' })
  @ApiDataResponse(typeEnum.object, CategoryResponse)
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    const category = await this.navService.getCategoryById(id)
    return DataObj.create(category)
  }

  @Post('categories')
  @ApiOperation({ summary: '创建分类' })
  @ApiDataResponse(typeEnum.object, CategoryResponse)
  async createCategory(@Body() dto: CreateCategoryDto) {
    const result = await this.navService.createCategory(dto)
    return DataObj.create(result)
  }

  // @Put('categories/:id')
  // @ApiOperation({ summary: '更新分类' })
  // @ApiDataResponse(typeEnum.object, CategoryResponse)
  // async updateCategory(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
  //   const result = await this.navService.updateCategory(id, dto)
  //   return DataObj.create(result)
  // }
  @Put('categories/:id')
  @ApiOperation({ summary: '更新分类' })
  @ApiDataResponse(typeEnum.object, CategoryResponse)
  async updateCategory(@Param('id', ParseIntPipe) id: number, @Body() category: Category) {
    const result = await this.navService.updateCategory(id, category)
    return DataObj.create(result)
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: '删除分类' })
  @ApiDataResponse(typeEnum.object, BaseResponse)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.navService.deleteCategory(id)
  }

  @Delete('categories')
  @ApiOperation({ summary: '批量删除分类' })
  @ApiDataResponse(typeEnum.object, BaseResponse)
  async bulkDeleteCategories(
    @Body(new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return await this.navService.deleteCategoryByIds(ids)
  }

  @Get('websites')
  @ApiOperation({ summary: '获取网站列表' })
  @ApiDataResponse(typeEnum.objectArr, WebsiteResponse)
  async getWebsites() {
    const websites = await this.navService.getWebsites()
    return DataObj.create(websites)
  }

  @Get('websites/:id')
  @ApiOperation({ summary: '获取网站详情' })
  @ApiDataResponse(typeEnum.object, WebsiteResponse)
  async getWebsiteById(@Param('id', ParseIntPipe) id: number) {
    const website = await this.navService.getWebsiteById(id)
    return DataObj.create(website)
  }

  @Get('categories/:categoryId/websites')
  @ApiOperation({ summary: '获取分类下的网站列表' })
  @ApiDataResponse(typeEnum.objectArr, WebsiteResponse)
  async getWebsitesByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    const websites = await this.navService.getWebsitesByCategory(categoryId)
    return DataObj.create(websites)
  }

  @Get('categories/:categoryId/websites/paging')
  @ApiOperation({ summary: '分页获取分类下的网站列表' })
  @ApiDataResponse(typeEnum.objectArr, WebsiteResponse)
  async getWebsitesByCategoryPaging(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query(PaginationPipe) paginationDto: PaginationDto,
  ) {
    const websites = await this.navService.getWebsitesByCategoryPaging(categoryId, paginationDto)
    return DataObj.create({
      rows: websites[0],
      total: websites[1],
    })
  }

  @Post('websites')
  @ApiOperation({ summary: '创建网站' })
  @ApiDataResponse(typeEnum.object, WebsiteResponse)
  async createWebsite(@Body() dto: CreateWebsiteDto) {
    const result = await this.navService.createWebsite(dto)
    return DataObj.create(result)
  }

  @Put('websites/:id')
  @ApiOperation({ summary: '更新网站' })
  @ApiDataResponse(typeEnum.object, WebsiteResponse)
  async updateWebsite(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWebsiteDto) {
    const result = await this.navService.updateWebsite(id, dto)
    return DataObj.create(result)
  }

  @Delete('websites/:id')
  @ApiOperation({ summary: '删除网站' })
  @ApiDataResponse(typeEnum.object, BaseResponse)
  async deleteWebsite(@Param('id', ParseIntPipe) id: number) {
    return await this.navService.deleteWebsiteById(id)
  }

  // @Delete('websites')
  // @ApiOperation({ summary: '批量删除网站' })
  // @ApiDataResponse(typeEnum.object, BaseResponse)
  // async bulkDeleteWebsites(
  //   @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
  //   ids: number[],
  // ) {
  //   return await this.navService.deleteWebsiteByIds(ids)
  // }

  @Delete('websites')
  @ApiOperation({ summary: '批量删除网站' })
  @ApiDataResponse(typeEnum.object, BaseResponse)
  async bulkDeleteWebsites(
    @Body(new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return await this.navService.deleteWebsiteByIds(ids)
  }

  @Put(':type/:id/sort')
  @ApiOperation({ summary: '更新排序' })
  @ApiDataResponse(typeEnum.object, BaseResponse)
  async updateSort(
    @Param('type') type: 'categories' | 'websites',
    @Param('id', ParseIntPipe) id: number,
    @Body('sort', ParseIntPipe) sort: number,
  ) {
    return await this.navService.updateSort(type === 'categories' ? 'category' : 'website', id, sort)
  }

  @Get('check-url')
  @ApiOperation({ summary: '检查URL是否有效' })
  @ApiDataResponse(typeEnum.object, BaseResponse)
  async checkUrl(@Query('url') url: string) {
    const result = await this.navService.checkUrl(url)
    return DataObj.create({ success: result })
  }

  @Get('favicon')
  @ApiOperation({ summary: '获取网站图标' })
  @ApiDataResponse(typeEnum.string)
  async getFavicon(@Query('url') url: string) {
    return await this.navService.getFavicon(url)
  }
}
