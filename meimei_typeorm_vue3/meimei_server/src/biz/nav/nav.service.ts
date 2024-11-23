import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'

import { Category, Website } from './entities'
import { CreateCategoryDto, UpdateCategoryDto, CreateWebsiteDto, UpdateWebsiteDto } from './dto'
import { PaginationDto } from 'src/common/dto/pagination.dto'

@Injectable()
export class NavService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
  ) {}

  // 分类相关方法
  async getCategories() {
    return await this.categoryRepository.find({
      order: { sort: 'ASC' },
    })
  }

  async getCategoriesPaging(paginationDto: PaginationDto) {
    return await this.categoryRepository.findAndCount({
      order: { sort: 'ASC', createTime: 1 },
      skip: paginationDto.skip,
      take: paginationDto.take,
    })
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    })
    if (!category) {
      throw new NotFoundException(`分类ID ${id} 不存在`)
    }
    return category
  }

  async createCategory(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      ...dto,
      sort: dto.sort || 0,
    })
    return await this.categoryRepository.save(category)
  }

  async updateCategory(id: number, newCategory: Category) {
    const category = await this.getCategoryById(id)
    Object.assign(category, newCategory)
    return await this.categoryRepository.save(category)
  }

  async deleteCategory(id: number) {
    const category = await this.getCategoryById(id)

    // 删除该分类下的所有网站
    await this.websiteRepository.delete({ categoryId: id })

    // 删除分类
    const result = await this.categoryRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`分类ID ${id} 不存在`)
    }

    return { success: true }
  }

  // 批量删除分类及其网站
  async deleteCategoryByIds(ids: number[]) {
    // 删除这些分类下的所有网站
    await this.websiteRepository.delete({ categoryId: In(ids) })

    // 删除分类
    await this.categoryRepository.delete(ids)
    return { success: true }
  }

  // 网站相关方法
  async getWebsites() {
    return await this.websiteRepository.find({
      order: { sort: 'ASC' },
    })
  }

  async getWebsiteById(id: number) {
    const website = await this.websiteRepository.findOne({
      where: { id },
    })
    if (!website) {
      throw new NotFoundException(`网站ID ${id} 不存在`)
    }
    return website
  }

  async getWebsitesByCategory(categoryId: number) {
    return await this.websiteRepository.find({
      where: { categoryId },
      order: { sort: 'ASC' },
    })
  }
  async getWebsitesByCategoryPaging(categoryId: number, paginationDto: PaginationDto) {
    return await this.websiteRepository.findAndCount({
      where: { categoryId },
      order: { sort: 'ASC', createTime: 1 },
      skip: paginationDto.skip,
      take: paginationDto.take,
    })
  }

  async createWebsite(dto: CreateWebsiteDto) {
    // 验证分类是否存在
    await this.getCategoryById(dto.categoryId)

    const website = this.websiteRepository.create({
      ...dto,
      sort: dto.sort || 0,
    })
    return await this.websiteRepository.save(website)
  }

  async updateWebsite(id: number, dto: UpdateWebsiteDto) {
    const website = await this.getWebsiteById(id)

    if (dto.categoryId) {
      // 验证新分类是否存在
      await this.getCategoryById(dto.categoryId)
    }

    Object.assign(website, dto)
    return await this.websiteRepository.save(website)
  }

  async deleteWebsiteById(id: number) {
    await this.getWebsiteById(id) // 确保网站存在
    await this.websiteRepository.delete(id)
    return { success: true }
  }

  // 批量删除网站
  async deleteWebsiteByIds(ids: number[]) {
    await this.websiteRepository.delete(ids)
    return { success: true }
  }

  // 更新排序
  async updateSort(type: 'category' | 'website', id: number, sort: number) {
    const repository = type === 'category' ? this.categoryRepository : this.websiteRepository
    await repository.update(id, { sort })
    return { success: true }
  }

  // 获取完整的导航数据结构
  async getFullNavData() {
    const [categories, websites] = await Promise.all([this.getCategories(), this.getWebsites()])

    return categories
      .map((category) => ({
        id: category.id,
        name: category.name,
        sort: category.sort,
        items: websites
          .filter((website) => website.categoryId === category.id)
          .map((website) => ({
            id: website.id,
            name: website.name,
            description: website.description,
            url: website.url,
            color: website.color,
            sort: website.sort,
          }))
          .sort((a, b) => a.sort - b.sort),
      }))
      .sort((a, b) => a.sort - b.sort)
  }

  // 检查URL是否有效
  async checkUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch (error) {
      return false
    }
  }

  // 获取网站图标
  async getFavicon(url: string): Promise<string> {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    } catch (error) {
      return ''
    }
  }
}
