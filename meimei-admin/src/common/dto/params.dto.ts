import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import * as moment from 'moment';

export class ParamsDto {
  /* 开始日期 */
  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'params[beginTime]',
    default: moment().format('YYYY-MM-DD'),
  })
  beginTime?: string;

  /* 结束日期 */
  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'params[endTime]',
    default: moment().format('YYYY-MM-DD'),
  })
  endTime?: string;
}
