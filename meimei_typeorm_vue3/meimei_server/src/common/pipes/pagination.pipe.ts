import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any) {
    const skip = value.pageNum ? (value.pageNum - 1) * value.pageSize : 0
    const take = value.pageSize ?? 0
    value.skip = skip
    value.take = take
    return value
  }
}
