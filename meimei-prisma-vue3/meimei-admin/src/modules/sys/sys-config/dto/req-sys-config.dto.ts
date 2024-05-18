/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-28 08:39:38
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-10 15:00:28
 * @FilePath: \meimei-new\src\modules\sys\sys-config\dto\req-sys-config.dto.ts
 * @Description:
 *
 */
import { Transform } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { DataBaseDto } from 'src/common/dto/data-base.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { transformDate } from 'src/common/func/transform-date.func';
import { Excel } from 'src/modules/common/excel/excel.decorator';

/* 创建 */
export class AddSysConfigDto extends DataBaseDto {
  @IsString()
  @Excel({ name: '参数名' })
  configName: string;

  @IsString()
  @Excel({ name: '参数键名' })
  configKey: string;

  @IsString()
  @Excel({ name: '参数键值' })
  configValue: string;

  @IsString()
  @Excel({ name: '参数类型', dictType: 'sys_oper_type' })
  configType: string;
}

/* 查询列表 */
export class GetSysConfigListDto extends PaginationDto {
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
  @Transform(({ value }) => transformDate(value))
  params: ParamsDto = {};
}

/* 编辑 */
export class UpdateSysConfigDto extends AddSysConfigDto {
  @IsNumber()
  configId: number;
}
