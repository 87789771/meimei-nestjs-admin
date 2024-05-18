/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-10 14:34:58
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 09:39:57
 * @FilePath: \meimei-new\src\modules\sys\sys-dict\dto\req-sys-dict.dto.ts
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
export class AddSysDictTypeDto extends DataBaseDto {
  @IsString()
  @Excel({ name: '字典名称' })
  dictName: string;

  @IsString()
  @Excel({ name: '字典类型' })
  dictType: string;

  @IsString()
  @Excel({ name: '状态', dictType: 'sys_normal_disable' })
  status: string;
}

/* 编辑 */
export class UpdateSysDictTypeDto extends AddSysDictTypeDto {
  @IsNumber()
  dictId: number;
}

/* 分页查询 */
export class GetSysDictTypeDto extends PaginationDto {
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
  @Transform(({ value }) => transformDate(value))
  params: ParamsDto = {};
}

/* 查询字典数据 */
export class GetDictDataListDto extends PaginationDto {
  @IsString()
  dictType: string;

  @IsOptional()
  @IsString()
  dictLabel: string;

  @IsOptional()
  @IsString()
  status: string;
}

/* 新增字典数据 */
export class AddDictDataDto extends DataBaseDto {
  @IsNumber()
  @Excel({
    name: '字典排序',
  })
  dictSort: number;

  @IsString()
  @Excel({
    name: '字典标签',
  })
  dictLabel: string;

  @IsString()
  @Excel({
    name: '字典键值',
  })
  dictValue: string;

  @IsOptional()
  @IsString()
  @Excel({
    name: '样式属性（其他样式扩展）',
  })
  cssClass?: string;

  @IsOptional()
  @IsString()
  @Excel({
    name: '表格回显样式',
  })
  listClass?: string;

  @IsOptional()
  @IsString()
  isDefault?: string;

  @IsString()
  @Excel({
    name: '字典类型',
  })
  dictType: string;

  @Excel({
    name: '状态',
    dictType: 'sys_normal_disable',
  })
  @IsOptional()
  @IsString()
  status?: string;
}

/* 编辑字典数据 */
export class UpdateDictDataDto extends AddDictDataDto {
  @IsNumber()
  dictCode: number;
}
