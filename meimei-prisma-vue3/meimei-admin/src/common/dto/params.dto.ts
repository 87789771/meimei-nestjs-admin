/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-27 16:58:02
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-04-28 22:58:59
 * @FilePath: /meimei-new/src/common/dto/params.dto.ts
 * @Description:
 *
 */
import { IsOptional, IsString } from 'class-validator';

export class ParamsDto {
  /* 开始日期 */
  @IsOptional()
  @IsString()
  beginTime?: string;

  /* 结束日期 */
  @IsOptional()
  @IsString()
  endTime?: string;
}
