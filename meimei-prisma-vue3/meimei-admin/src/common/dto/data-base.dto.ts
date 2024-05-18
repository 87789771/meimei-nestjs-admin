import { IsOptional, IsString } from 'class-validator';
import { Excel } from 'src/modules/common/excel/excel.decorator';

/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-28 10:26:49
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 10:25:34
 * @FilePath: \meimei-new\src\common\dto\data-base.dto.ts
 * @Description: 基础类型
 *
 */
export class DataBaseDto {
  @Excel({ name: '创建人', sort: 100 })
  createBy?: string;
  @Excel({ name: '创建时间', sort: 101, dateFormat: 'YYYY-MM-DD HH:mm:ss' })
  createTime?: Date | string;
  @Excel({ name: '更新人', sort: 102 })
  updateBy?: string;
  @Excel({ name: '更新时间', sort: 103, dateFormat: 'YYYY-MM-DD HH:mm:ss' })
  updateTime?: Date | string;
  @Excel({ name: '备注', sort: 104 })
  @IsOptional()
  @IsString()
  remark?: string;
}
