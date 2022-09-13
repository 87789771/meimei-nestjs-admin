import { OmitType } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { DictData } from '../entities/dict_data.entity';
import { DictType } from '../entities/dict_type.entity';

/* 新增字典类型 */
export class ReqAddDictTypeDto extends OmitType(DictType, [
  'dictId',
] as const) {}

/* 查询字典类型list */
export class ReqDictTypeListDto extends PaginationDto {
  @IsOptional()
  @IsString()
  dictName?: string;

  @IsOptional()
  @IsString()
  dictType?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  params?: ParamsDto;
}

/* 查询字典数据 */
export class ReqDictDataListDto extends PaginationDto {
  @IsString()
  dictType: string;

  @IsOptional()
  @IsString()
  dictLabel: string;

  @IsOptional()
  @IsString()
  status: string;
}

/* 编辑字典数据 */
export class ReqUpdateDictDataDto extends OmitType(DictData, [
  'dictType',
] as const) {
  @IsString()
  dictType: string;
}

/* 新增字典数据 */
export class ReqAddDictDataDto extends OmitType(ReqUpdateDictDataDto, [
  'dictCode',
] as const) {}
