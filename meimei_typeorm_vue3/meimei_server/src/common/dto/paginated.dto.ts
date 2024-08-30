import { ApiHideProperty } from '@nestjs/swagger'

export class PaginatedDto<T> {
  /* 总条数 */
  total: number

  @ApiHideProperty()
  rows: T[]
}
