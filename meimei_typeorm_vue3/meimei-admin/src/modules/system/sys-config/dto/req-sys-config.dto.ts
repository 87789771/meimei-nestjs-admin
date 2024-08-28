import { OmitType } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { SysConfig } from '../entities/sys-config.entity';

/* 新增 */
export class ReqAddConfigDto extends OmitType(SysConfig, [
  'configId',
] as const) {}

/* 分页查询 */
export class ReqConfigListDto extends PaginationDto {
  /* 参数名称 */
  @IsOptional()
  @IsString()
  configName?: string;

  /* 参数键名 */
  @IsOptional()
  @IsString()
  configKey?: string;

  /* 参数值 */
  @IsOptional()
  @IsString()
  configType?: string;

  @IsOptional()
  @IsObject()
  params: ParamsDto;
}
