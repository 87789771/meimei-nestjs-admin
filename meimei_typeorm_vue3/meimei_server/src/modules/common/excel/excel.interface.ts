import { ExcelTypeEnum } from './excel.enum'
import { DictData } from 'src/modules/system/dict/entities/dict_data.entity'

export interface ExcelOption {
  // 导出时在excel中排序，值越小越靠前
  sort?: number

  // 导出到Excel中的名字
  name: string

  // 日期格式, momnet文档看规则（http://momentjs.cn/docs/）  如: YYYY-MM-DD 或  YYYY-MM-DD HH:mm:ss
  dateFormat?: string

  // 如果是字典类型，请设置字典的type值 (如: sys_user_sex)
  dictType?: string

  // 读取内容转表达式 (如: {0:'男人',1:'女',2:'未知'})
  readConverterExp?: any

  // 分隔符，读取字符串组内容
  separator?: string

  // 文字后缀,如% 90 变成90%
  suffix?: string

  // 当值为空时,字段的默认值
  defaultValue?: string

  // 字段类型（0：导出导入；1：仅导出；2：仅导入）
  type?: ExcelTypeEnum
}
export interface ExcelOptionAll extends ExcelOption {
  // 字段名
  propertyKey: string

  /* 字段值数组 */
  dictDataArr: DictData[]
}
