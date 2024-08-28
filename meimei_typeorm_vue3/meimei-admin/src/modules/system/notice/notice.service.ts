/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ReqAddNoticeDto, ReqNoeiceList } from './dto/req-notice.dto';
import { Notice } from './entities/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}
  /* 新增或编辑 */
  async addOrUpdate(reqAddNoticeDto: ReqAddNoticeDto) {
    return await this.noticeRepository.save(reqAddNoticeDto);
  }

  /* 分页查询 */
  async list(reqNoeiceList: ReqNoeiceList): Promise<PaginatedDto<Notice>> {
    const where: FindOptionsWhere<Notice> = {};
    if (reqNoeiceList.noticeTitle) {
      where.noticeTitle = Like(`%${reqNoeiceList.noticeTitle}%`);
    }
    if (reqNoeiceList.createBy) {
      where.createBy = Like(`%${reqNoeiceList.createBy}%`);
    }
    if (reqNoeiceList.noticeType) {
      where.noticeType = reqNoeiceList.noticeType;
    }
    const result = await this.noticeRepository.findAndCount({
      select: [
        'noticeId',
        'noticeTitle',
        'createBy',
        'createTime',
        'noticeType',
        'status',
      ],
      where,
      skip: reqNoeiceList.skip,
      take: reqNoeiceList.take,
    });
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /* 通过id查询 */
  async findById(noticeId: number) {
    return this.noticeRepository.findOneBy({ noticeId });
  }

  /* 删除 */
  async delete(noticeIdArr: number[] | string[]) {
    return this.noticeRepository.delete(noticeIdArr);
  }
}
