import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { BaseResult } from 'src/common/interface'
import { Public } from 'src/common/decorators/public.decorator'

@ApiTags('App')
@Controller()
export class AppController {
  @Get()
  @Public()
  getHello(): BaseResult {
    return {
      code: HttpStatus.OK,
      msg: 'Ok',
      data: {
        serverTime: new Date().getTime(),
      },
    }
  }
}
