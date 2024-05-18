/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-28 23:24:32
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-04-28 23:25:38
 * @FilePath: /meimei-new/src/common/func/transform-date.func.ts
 * @Description: 讲时间段转化为符合数据库查询使用的格式
 *
 */
import dayjs from 'dayjs';
import { ParamsDto } from '../dto/params.dto';

export function transformDate(paramsDto: ParamsDto) {
  paramsDto.beginTime = dayjs(paramsDto.beginTime).format();
  paramsDto.endTime = dayjs(paramsDto.endTime).add(1, 'days').format();
  return paramsDto;
}
