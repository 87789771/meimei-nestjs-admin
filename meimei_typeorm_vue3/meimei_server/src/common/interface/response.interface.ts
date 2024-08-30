/**
 * 统一响应
 */

import { HttpStatus } from '@nestjs/common'

/**
 * 基础响应接口
 */
export interface BaseResult {
  // Is request success?
  // success: boolean

  // Response code
  code: HttpStatus | number

  // Message
  msg: string

  // Response content
  data?: Record<string, any> | string | number

  // Response error
  error?: string

  // Response errors
  errors?: Array<string>

  // Version
  version?: string

  // timestamp
  timestamp?: string
}

interface PaginationData<T> {
  total: number

  records: Array<T>
}

/**
 * 分页响应接口
 */
export interface PagingResult<T> extends BaseResult {
  // Response content
  data?: PaginationData<T>
}
