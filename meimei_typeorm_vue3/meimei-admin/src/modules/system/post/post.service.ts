/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { ReqAddPostDto, ReqPostListDto } from './dto/req-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  /* 通过岗位编码查询 */
  async findByPostCode(postCode: string) {
    return await this.postRepository.findOneBy({ postCode });
  }

  /* 新增或编辑 */
  async addOrUpdate(reqAddPostDto: ReqAddPostDto) {
    await this.postRepository.save(reqAddPostDto);
  }

  /* 分页查询 */
  async list(reqPostListDto: ReqPostListDto): Promise<PaginatedDto<Post>> {
    const where: FindOptionsWhere<Post> = {};
    if (reqPostListDto.postCode) {
      where.postCode = Like(`%${reqPostListDto.postCode}%`);
    }
    if (reqPostListDto.postName) {
      where.postName = Like(`%${reqPostListDto.postName}%`);
    }
    if (reqPostListDto.status) {
      where.status = reqPostListDto.status;
    }
    const result = await this.postRepository.findAndCount({
      select: [
        'postId',
        'postCode',
        'postName',
        'createTime',
        'postSort',
        'status',
        'createBy',
        'remark',
      ],
      where,
      order: {
        postSort: 1,
        createTime: 1,
      },
      skip: reqPostListDto.skip,
      take: reqPostListDto.take,
    });
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /* 通过id查找 */
  async findById(postId: number) {
    return await this.postRepository.findOneBy({ postId });
  }

  /* 通过id数组删除 */
  async delete(postIdArr: number[] | string[]) {
    return await this.postRepository.delete(postIdArr);
  }

  /* 通过 id 数组查询所有符合的数据 */
  async listByIdArr(idArr: number[]) {
    return this.postRepository.find({
      where: {
        postId: In(idArr),
      },
    });
  }
}
