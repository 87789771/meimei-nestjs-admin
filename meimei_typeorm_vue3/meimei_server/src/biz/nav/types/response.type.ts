import { ApiProperty } from '@nestjs/swagger';

export class OperationResult {
  @ApiProperty({ description: '操作是否成功' })
  success: boolean
}
