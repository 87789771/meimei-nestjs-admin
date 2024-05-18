/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { BusinessTypeEnum, Log } from 'src/common/decorators/log.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { ReqOnline } from './dto/req-online.dto';
import { ResOnlineDto } from './dto/res-online.dto';
import { OnlineService } from './online.service';
@ApiTags('在线用户')
@Controller('monitor/online')
export class OnlineController {
  constructor(private readonly onlineService: OnlineService) {}
  /* 查询在线用户 */
  @Get('list')
  @RequiresPermissions('monitor:online:query')
  @ApiDataResponse(typeEnum.objectArr, ResOnlineDto)
  async online(@Query() reqOnline: ReqOnline) {
    return this.onlineService.online(reqOnline);
  }

  /* 强退 */
  @Delete(':tokenKey')
  @RequiresPermissions('monitor:online:forceLogout')
  @Log({
    title: '强退用户',
    businessType: BusinessTypeEnum.force,
  })
  async deletOnline(@Param('tokenKey') tokenKey: string) {
    await this.onlineService.deletOnline(tokenKey);
  }
}
