/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-09 11:09:19
 * @LastEditTime: 2022-09-18 11:07:53
 * @LastEditors: Please set LastEditors
 * @Description: 分页请求返回的 openApi 装饰器
 * @FilePath: /meimei-admin/src/common/decorators/api-paginated-response.decorator.ts
 * You can you up，no can no bb！！
 */

import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDto } from '../dto/paginated.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDto),
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              rows: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
