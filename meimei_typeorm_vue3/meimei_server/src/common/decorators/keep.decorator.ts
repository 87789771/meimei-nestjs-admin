import { SetMetadata } from '@nestjs/common'
import { KEEP_KEY } from '../contants/decorator.contant'

export const Keep = () => SetMetadata(KEEP_KEY, true)
