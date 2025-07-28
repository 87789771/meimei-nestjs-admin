/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-30 14:43:37
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2025-07-28 20:30:38
 * @FilePath: /meimei-admin/src/modules/common/excel/excel.service.ts
 * @Description: 公共导出模块
 *
 */
import { Injectable, Type } from '@nestjs/common';
import { EXCEL_ARR_KRY } from './excel.constant';
import xlsx from 'node-xlsx';
import dayjs from 'dayjs';
import { ExcelOption, ExcelOptionAll } from './excel.interface';
import { ColumnTypeEnum, ExcelTypeEnum } from './excel.enum';
import * as fs from 'fs';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SysDictService } from 'src/modules/sys/sys-dict/sys-dict.service';

@Injectable()
export class ExcelService {
  constructor(private readonly sysDictService: SysDictService) {}
  /* 导出 */
  async export<TModel>(model: TModel, list: any[]) {
    const exportObjArr = Reflect.getMetadata(EXCEL_ARR_KRY, model) ?? [];
    const data = await this.formatExport(exportObjArr, list);
    const fileBuffer = xlsx.build([
      {
        name: 'sheet1',
        data,
        options: {},
      },
    ]);
    return new Uint8Array(fileBuffer);
  }

  /* 导入 */
  async import<TModel>(
    model: new (...args: any[]) => TModel,
    file: Express.Multer.File,
  ): Promise<TModel[]> {
    try {
      const workSheetsFromBuffer = xlsx.parse(
        file.buffer || fs.readFileSync(file.path),
      );
      const data = workSheetsFromBuffer[0].data;
      if (data.length < 2) throw Error('格式错误');
      const importObjArr: ExcelOptionAll[] =
        Reflect.getMetadata(EXCEL_ARR_KRY, model) ?? [];
      const excelData = await this.formatImport(importObjArr);
      if (data[0].toString() !== excelData[0].toString())
        throw Error('格式错误');
      const objPropertyArr = data[0] as string[];
      const dataArr = data.slice(2);
      const result: TModel[] = [];
      for await (const item of dataArr) {
        const obj = new model();
        objPropertyArr.forEach((item2, index) => {
          const t = importObjArr.find(
            (item3) => item3.propertyKey === item2,
          )?.t;
          let newValue = undefined;
          switch (t) {
            case ColumnTypeEnum.boolean:
              newValue = Boolean(item[index]);
              break;
            case ColumnTypeEnum.string:
              newValue = String(item[index]);
              break;
            case ColumnTypeEnum.number:
              newValue = Number(item[index]);
              break;
            default:
              newValue = item[index];
              break;
          }
          obj[item2] = newValue;
        });
        result.push(obj);
      }
      return result;
    } catch (error) {
      console.log(error);

      throw new ApiException('文件格式错误');
    }
  }

  /* 导出模板 */
  async importTemplate<TModel extends Type<any>>(model: TModel) {
    const importObjArr = Reflect.getMetadata(EXCEL_ARR_KRY, model) ?? [];
    const data = await this.formatImport(importObjArr);
    const fileBuffer = xlsx.build([
      {
        name: '表格1',
        data,
        options: {},
      },
    ]);
    return new Uint8Array(fileBuffer);
  }

  /* 整理导出数据 */
  private async formatExport(exportObjArr: ExcelOptionAll[], list: any[]) {
    const optionPromiseArr = exportObjArr
      .filter(
        (item) =>
          item.type === ExcelTypeEnum.ALL || item.type === ExcelTypeEnum.EXPORT,
      ) //过滤
      .sort((obj, obj2) => obj.sort - obj2.sort) //排序
      .map(async (item) => {
        //获取字典数据
        if (item.dictType) {
          item.dictDataArr = await this.sysDictService.getDictDataByDictType(
            item.dictType,
          );
        }
        return item;
      });
    const optionArr: ExcelOptionAll[] = await Promise.all(optionPromiseArr);
    const data = [];
    data.push(optionArr.map((item) => item.name)); //插入表头
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const inArr = optionArr.map((option) => {
        let dataItem = element[option.propertyKey];
        if (option.dateFormat) {
          dataItem = dayjs(dataItem).format(option.dateFormat);
        }
        if (option.dictType) {
          const dictData = option.dictDataArr.find(
            (item) => item.dictValue == dataItem,
          );
          dataItem = dictData ? dictData.dictLabel : '';
        }
        if (option.readConverterExp) {
          dataItem = option.readConverterExp[dataItem] ?? '';
        }
        if (option.separator) {
          dataItem = dataItem.join(option.separator);
        }
        if (option.suffix) {
          dataItem = '' + dataItem + option.suffix;
        }
        if (option.defaultValue) {
          dataItem = dataItem ?? option.defaultValue;
        }
        switch (option.t) {
          case ColumnTypeEnum.boolean:
            dataItem = Boolean(dataItem);
            break;
          case ColumnTypeEnum.string:
            dataItem = String(dataItem);
            break;
          case ColumnTypeEnum.number:
            dataItem = Number(dataItem);
            break;
          default:
            break;
        }
        return dataItem;
      });
      data.push(inArr); //插入每行数据
    }
    return data;
  }

  // 整理导入模板
  private async formatImport(importObjArr: ExcelOptionAll[]): Promise<[][]> {
    const optionPromiseArr = importObjArr
      .filter((item) => item.type === ExcelTypeEnum.ALL || item.type === ExcelTypeEnum.IMPORT) //过滤
      .sort((obj, obj2) => obj.sort - obj2.sort) //排序
      .map(async (item) => {
        //获取字典数据
        if (item.dictType) {
          item.dictDataArr = await this.sysDictService.getDictDataByDictType(item.dictType);
        }
        return item;
      });

    const optionArr: ExcelOptionAll[] = await Promise.all(optionPromiseArr);
    const data = [];
    data.push(optionArr.map((item) => item.propertyKey));
    data.push(
      optionArr.map((item) => {
        if (item.required) {
          return item.name + '（必填）';
        }
        return item.name;
      }),
    );
    return data;
  }
}
