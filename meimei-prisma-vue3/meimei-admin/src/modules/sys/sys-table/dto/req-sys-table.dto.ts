/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-17 17:21:17
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 20:28:15
 * @FilePath: /meimei-new/src/modules/sys/sys-table/dto/req-sys-table.dto.ts
 * @Description:
 *
 */
import { IsString } from 'class-validator';
import { DataBaseDto } from 'src/common/dto/data-base.dto';

/* 请求表格配置 */
export class GetTableDto {
  @IsString()
  tableId: string;
}

/* 新增或者编辑表格配置 */
export class AddSysTableDto extends DataBaseDto {
  @IsString()
  tableId: string;

  @IsString()
  tableJsonConfig: string;

  createBy: string;
}
