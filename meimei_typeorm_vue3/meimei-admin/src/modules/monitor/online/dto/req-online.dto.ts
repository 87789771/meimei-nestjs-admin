import { IsOptional, IsString } from 'class-validator';
/* 在线用户查询 */
export class ReqOnline {
  /* 登录地址 */
  @IsOptional()
  @IsString()
  ipaddr?: string;

  /* 用户名 */
  @IsOptional()
  @IsString()
  userName?: string;
}
