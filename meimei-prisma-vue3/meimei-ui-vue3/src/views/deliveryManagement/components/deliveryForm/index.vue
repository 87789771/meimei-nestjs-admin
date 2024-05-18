<!--
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-04-03 09:10:03
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-04-07 17:03:23
 * @FilePath: \耗材前端\src\views\deliveryManagement\components\deliveryForm\index.vue
 * @Description: 
 * 
-->
<template>
  <div class="h-100">
    <hot-table
      ref="hot"
      :settings="hotSettings"
      :cells="cells"
      :columns="columns"
      :data="dataList"
    ></hot-table>
  </div>
</template>

<script setup>
//  不能使用  ref 进行数据的动态绑定。  这样表格操作会异常。 应该使用  updateSettings 更新配置，和loadData去加载数据
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'
import 'handsontable/dist/handsontable.full.css'
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n'
import { dateChange } from '@/utils/index.js'
import dayjs from 'dayjs'
window.dayjs = dayjs
registerAllModules()
registerLanguageDictionary(zhCN)
defineExpose({ getHotInstance })
const hot = ref(null)
const hotSettings = {
  height: '100%',
  width: '100%',
  language: 'zh-CN', // 设置语言为中文
  autoWrapRow: true, //自动换行
  autoWrapCol: true, //自动换列
  rowHeaders: true, //启动行头
  colHeaders: true, //启动列头
  licenseKey: 'non-commercial-and-evaluation', //试用密匙
  readOnly: false, //设置只读
  contextMenu: {
    //启动上下文菜单
    items: {
      row_below: {
        name: '新增批次',
        callback () {
          const rowIndex = this.getSelectedLast()[0]
          if (rowIndex < 0) return
          const rowData = this.getDataAtRow(rowIndex)
          // 将表格的所有操作批量处理，增加渲染速度
          this.batch(() => {
            //在索引下插入一行
            this.alter('insert_row_below', rowIndex)
            const countCols = this.countCols()
            for (let col = 0; col < countCols; col++) {
              this.setCellMeta(rowIndex + 1, col, 'readOnly', false)
            }
            this.populateFromArray(
              rowIndex + 1,
              0,
              [rowData],
              rowIndex + 1,
              countCols - 1,
              'splice'
            )
            columns.forEach((item, col) => {
              this.setCellMeta(rowIndex + 1, col, 'readOnly', item.readOnly)
            })
          })
        }
      },
      remove_row: true,
      '---------': true,
      clear_column: true
      // 其他菜单项...
    }
  },
  dropdownMenu: {
    items: {
      // 配置只有前3列和第9列显示过滤
      filter_by_value: {
        hidden () {
          return (
            this.getSelectedRangeLast().to.col > 3 &&
            this.getSelectedRangeLast().to.col != 9
          )
        }
      },
      // 配置只有前3列和第9列显示过滤
      filter_action_bar: {
        hidden () {
          return (
            this.getSelectedRangeLast().to.col > 3 &&
            this.getSelectedRangeLast().to.col != 9
          )
        }
      }
    }
  }, //显示列菜单
  filters: true, //启动列过滤器
  columnSorting: false, //列排序
  multiColumnSorting: false, //多列排序
  dateFormat: 'YYYY-MM-DD', // 全局时间格式化
  fixedColumnsLeft: 2, // 设置要固定的列数为2
  afterGetColHeader (col, TH) {
    if (col > 3) {
      const button = TH.querySelector('.changeType')
      if (!button) return
      button.parentElement.removeChild(button)
    }
  },
  afterChange (changes, source) {
    if (source === 'edit') {
      var row = changes[0][0]
      var prop = changes[0][1]
      var value = changes[0][3]
      // 生产日期有效期格式化
      if (['productionDate', 'validityDate', 'distNum'].includes(prop)) {
        let formattedValue = undefined
        const col = columns.findIndex(item => item.data === prop)
        if (['productionDate', 'validityDate'].includes(prop)) {
          formattedValue = dateChange(value)
        }
        //   配送数量格式化
        if (prop === 'distNum') {
          formattedValue = parseInt(value) || 0
        }
        this.setDataAtCell(row, col, formattedValue, 'setDataAtCell')
      }
    }
  }
}
function getType (row, col, prop) {
  if (prop === 'distNum') return 'numeric'
  if (['productionDate', 'validityDate'].includes(prop)) return 'date'
  return 'text'
}
function getValidator (row, col, prop) {
  // 单元格校验函数
  return function validator (query, callback) {
    const attrs = ['lot', 'productionDate', 'validityDate', 'distNum']
    if (attrs.includes(prop)) {
      if (!query) return callback(false)
      //先找到当前行的consumablesCode
      const dataArrArr = getHotInstance().getData()
      const currentRoowGoodsCode = dataArrArr[row][0]
      //先找该编码的所有商品
      const currentGoods = dataList.filter(
        item => item.consumablesCode === currentRoowGoodsCode
      )
      // 校验批号、生产日期、有效期
      if (['lot', 'productionDate', 'validityDate'].includes(prop)) {
        // 生产日期和效期的范围校验
        if (['productionDate', 'validityDate'].includes(prop)) {
          if ('productionDate' === prop) {
            //生产日期要早于今天
            if (dayjs().isBefore(dayjs(query))) return callback(false)
          }
          if ('validityDate' === prop) {
            //有效期要晚于今天
            if (dayjs(query).isBefore(dayjs())) return callback(false)
          }
        }
        // 批号 + 生产日期 + 有效期至  不能相同
        const batchArr = currentGoods.map(
          item => item.lot + item.productionDate + item.validityDate
        )
        if (batchArr.length !== new Set(batchArr).size) return callback(false)
      }
      // 校验配送数量
      if (prop === 'distNum') {
        const allNumber = currentGoods.reduce((total, cur) => {
          return (Number(cur.distNum) || 0) + Number(total)
        }, 0)
        if (allNumber > currentGoods[0].allowNum) return callback(false)
      }
    }
    callback(true)
  }
}
function getClassName (row, col, prop) {
  if (['consumablesCode', 'consumablesName'].includes(prop)) {
    const goodsCodeArr = [
      ...new Set(dataList.map(item => item.consumablesCode))
    ]
    const currentRowGoodsCode = getHotInstance().getDataAtCell(row, 0)
    const inde = goodsCodeArr.findIndex(item => item === currentRowGoodsCode)
    if (inde % 2 === 0) return 'brandColorBg'
    return 'successColorBg'
  }
}
const cells = function (row, col, prop) {
  const cellProperties = {
    type: getType(row, col, prop),
    validator: getValidator(row, col, prop),
    className: getClassName(row, col, prop)
  }
  return cellProperties
}
const columns = [
  {
    width: 120,
    data: 'consumablesCode',
    title: '商品编码',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 200,
    data: 'consumablesName',
    title: '商品名称',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 240,
    data: 'spec',
    title: '规格',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 200,
    data: 'model',
    title: '型号',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 130,
    data: 'lot',
    title: '批号',
    allowEmpty: false //不允许为空
  },
  {
    width: 110,
    data: 'productionDate',
    title: '生产日期',
    allowEmpty: false //不允许为空
  },
  {
    width: 110,
    data: 'validityDate',
    title: '有效期至',
    allowEmpty: false //不允许为空
  },
  {
    width: 100,
    data: 'distNum',
    title: '配送数量',
    allowEmpty: false //不允许为空
  },
  {
    width: 100,
    data: '订单数量',
    title: '订单数量',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 100,
    data: '已配送数量',
    title: '已配送数量',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 100,
    data: '已制单数量',
    title: '已制单数量',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 100,
    data: 'allowNum',
    title: '可制单数量',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 70,
    data: '单位',
    title: '单位',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 110,
    data: '单价（元）',
    title: '单价（元）',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 150,
    data: 'UDI条码',
    title: 'UDI条码',
    allowEmpty: false //不允许为空
  },
  {
    width: 100,
    data: '注册证号',
    title: '注册证号',
    allowEmpty: false //不允许为空
  },
  {
    width: 100,
    data: '灭菌日期',
    title: '灭菌日期',
    allowEmpty: true //不允许为空
  },
  {
    width: 100,
    data: '灭菌批号',
    title: '灭菌批号',
    allowEmpty: true //不允许为空
  },
  {
    width: 100,
    data: '生产许可证',
    title: '生产许可证',
    allowEmpty: false //不允许为空
  },
  {
    width: 80,
    data: '赋码系数',
    title: '赋码系数',
    allowEmpty: false //不允许为空
  },
  {
    width: 100,
    data: '大包装单位系数',
    title: '大包装单位系数',
    allowEmpty: false //不允许为空
  },
  {
    width: 100,
    data: '采购时间',
    title: '采购时间',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 70,
    data: '采购人',
    title: '采购人',
    allowEmpty: false, //不允许为空
    readOnly: true
  },
  {
    width: 120,
    data: 'factoryName',
    title: '生产厂家',
    allowEmpty: true, //不允许为空
    readOnly: true
  },
  {
    width: 100,
    data: '备注',
    title: '备注',
    allowEmpty: true //不允许为空
  }
]
let dataList = []
for (let index = 0; index < 20; index++) {
  let row = {
    consumablesCode: '编码' + index,
    consumablesName: '商品名称' + index,
    规格: '规格' + index,
    型号: '型号' + index,
    lot: undefined,
    productionDate: undefined,
    validityDate: undefined,
    distNum: undefined,
    订单数量: 2333,
    已配送数量: 122,
    已制单数量: 1232,
    allowNum: 1232,
    单位: '单位',
    '单价（元）': 1234,
    UDI条码: undefined,
    注册证号: '',
    灭菌日期: '',
    灭菌批号: '',
    生产许可证: '',
    赋码系数: 1,
    大包装单位系数: 1,
    采购时间: '2027-03-21',
    采购人: '小蒋',
    生产厂家: '哈药六厂',
    备注: ''
  }
  dataList.push(row)
}
//更新数据
function loadData () {
  hot.value.hotInstance.loadData(dataList)
}

// 更新配置
function updateSettings () {
  hot.value.hotInstance.updateSettings(hotSettings)
}

// 获取hot实例
function getHotInstance () {
  window.hotInstance = hot.value.hotInstance
  return hot.value.hotInstance
}
</script>

<style lang="scss">
.brandColorBg {
  background: #409eff !important;
  color: #fff !important;
}
.successColorBg {
  background: #67c23a !important;
  color: #fff !important;
}
</style>
