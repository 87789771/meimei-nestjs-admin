/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-17 17:21:17
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 17:30:04
 * @FilePath: \meimei-new\src\modules\sys\sys-web\dto\req-sys-web.dto.ts
 * @Description:
 *
 */
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { DataBaseDto } from 'src/common/dto/data-base.dto';

export class AddSysWebDto extends DataBaseDto {
  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsString()
  sideTheme?: string;

  @IsOptional()
  @IsBoolean()
  topNav?: boolean;

  @IsOptional()
  @IsBoolean()
  tagsView?: boolean;

  @IsOptional()
  @IsBoolean()
  fixedHeader?: boolean;

  @IsOptional()
  @IsBoolean()
  sidebarLogo?: boolean;

  @IsOptional()
  @IsBoolean()
  dynamicTitle?: boolean;

  createBy: string;
}
