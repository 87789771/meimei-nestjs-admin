import { Injectable, Type } from '@nestjs/common';
import { EXCEL_ARR_KRY } from './excel.constant';
import xlsx from 'node-xlsx';
import * as moment from 'moment';
import { DictService } from 'src/modules/system/dict/dict.service';
import { ExcelOptionAll } from './excel.interface';
import { ExcelTypeEnum } from './excel.enum';
import * as fs from 'fs';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class ExcelService {
  constructor(private readonly dictService: DictService) {}
  /* 导出 */
  async export<Model, TModel extends Type<Model>>(
    model: TModel,
    list: Model[],
  ) {
    const exportObjArr = Reflect.getMetadata(EXCEL_ARR_KRY, model) ?? [];
    const data = await this.formatExport(exportObjArr, list);
    const arrBuffer = xlsx.build([
      {
        name: '表格1',
        data,
        options: {},
      },
    ]);
    return Buffer.from(arrBuffer);
  }

  /* 导入 */
  async import<TModel extends Type<any>>(
    model: TModel,
    file: Express.Multer.File,
  ) {
    try {
      const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(file.path));
      const data = workSheetsFromBuffer[0].data;
      if (data.length < 2) throw Error('格式错误');
      const importObjArr = Reflect.getMetadata(EXCEL_ARR_KRY, model) ?? [];
      const excelData = await this.formatImport(importObjArr);
      if (data[0].toString() !== excelData[0].toString())
        throw Error('格式错误');
      const objPropertyArr = data[0] as string[];
      const dataArr = data.slice(2);
      const result = [];
      for await (const item of dataArr) {
        const obj = new model();
        objPropertyArr.forEach((item2, index) => {
          obj[item2] = item[index];
        });
        result.push(obj);
      }
      return result;
    } catch (error) {
      throw new ApiException('文件格式错误');
    }
  }

  /* 导出模板 */
  async importTemplate<TModel extends Type<any>>(model: TModel) {
    const importObjArr = Reflect.getMetadata(EXCEL_ARR_KRY, model) ?? [];
    const data = await this.formatImport(importObjArr);
    const arrBuffer = xlsx.build([
      {
        name: '表格1',
        data,
        options: {},
      },
    ]);
    return Buffer.from(arrBuffer);
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
          item.dictDataArr = await this.dictService.getDictDataByDictType(
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
          dataItem = moment(dataItem).format(option.dateFormat);
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
        return dataItem;
      });
      data.push(inArr); //插入每行数据
    }
    return data;
  }

  // 整理导入模板
  private async formatImport(importObjArr: ExcelOptionAll[]): Promise<[][]> {
    const optionArr: ExcelOptionAll[] = importObjArr
      .filter(
        (item) =>
          item.type === ExcelTypeEnum.ALL || item.type === ExcelTypeEnum.IMPORT,
      ) //过滤
      .sort((obj, obj2) => obj.sort - obj2.sort); //排序
    const data = [];
    data.push(optionArr.map((item) => item.propertyKey));
    data.push(optionArr.map((item) => item.name));
    return data;
  }
}
