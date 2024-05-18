/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-16 16:44:43
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-16 16:45:15
 * @FilePath: \meimei-new\src\modules\monitor\online\dto\req-online.dto copy.ts
 * @Description: 
 * 
 */
import { IsOptional, IsString } from 'class-validator';

export class OnlineList {
  /* 登录地址 */
  @IsOptional()
  @IsString()
  ipaddr?: string;

  /* 用户名 */
  @IsOptional()
  @IsString()
  userName?: string;
}
