<!--
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-03-30 13:40:22
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-04-03 15:57:02
 * @FilePath: \耗材前端\src\components\Json2Excel\index.vue
 * @Description: 
 * 
-->
<template>
  <div class="app-container app-js">
    <el-button @click="exportData">导出</el-button>
    <el-button @click="updateSettings">更新配置</el-button>
    <el-button @click="validate">校验</el-button>
    <el-button @click="resetFilter">重置排序和过滤</el-button>
    <hot-table ref="hot" :settings="hotSettings" :data="data"></hot-table>
  </div>
</template>

<script setup>
//  不能使用  ref 进行数据的动态绑定。  这样表格操作会异常。 应该使用  updateSettings 更新配置，和loadData去加载数据
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'
import 'handsontable/dist/handsontable.full.css'
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n'
import { nextTick, onMounted } from 'vue'
registerAllModules()
registerLanguageDictionary(zhCN)
const hotSettings = ref({
  key: 1,
  height: '70%',
  width: '100%',
  language: 'zh-CN', // 设置语言为中文
  autoWrapRow: true, //自动换行
  autoWrapCol: true, //自动换列
  rowHeaders: true, //启动行头
  colHeaders: true, //启动列头
  licenseKey: 'non-commercial-and-evaluation',
  colHeaders: ['商品名', '规格', '型号', '效期'], //自定义列头
  readOnly: false, //设置只读
  contextMenu: true, //启动上下文菜单
  dropdownMenu: true, //显示列菜单
  filters: true, //启动列过滤器
  //   columnSorting: true, //列排序
  multiColumnSorting: true, //多列排序
  dateFormat: 'YYYY-MM-DD', // 全局时间格式化
  fillHandle: true, //可以填充，可以想excel表一样往下拖，如果为true，就会多加一行
  mergeCells: [], // 允许合并行
  hiddenRows: {
    //隐藏行
    rows: []
  },
  // fixedRowsTop: 1, // 固定第一行

  // cells(row, col, prop) {
  //     console.log(prop);
  //     if(row == 1) {
  //         return {
  //             className:'custom-cell'
  //         }
  //     }
  // },
  cell: [
    {
      row: 0,
      col: 0,
      // className: 'custom-cell',
      type: 'dropdown',
      source: ['测试1', '测试2']
    }
  ],
  columns: [
    {
      data: 'id',
      title: '第一列',
      type: 'dropdown',
      allowEmpty: false, //不允许为空
      source: ['测试1', '测试2']
    },
    {
      data: 'name',
      title: '第二列'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'age',
      title: '第二列22',
      type: 'numeric'
    },
    {
      data: 'date',
      type: 'date',
      title: '第二列',
      dateFormat: 'YYYY-MM-DD',
      correctFormat: true,
      allowEmpty: false //不允许为空
      // validator(value, callback) {
      //     console.log(hot.value.help);
      //     console.log(this);
      // }
    }
  ],
  columnSummary: [
    //设置列的摘要，比如合计
    {
      sourceColumn: 2,
      type: 'sum',
      // for this column summary, count row coordinates backward
      reversedRowCoords: true,
      // now, to always display this column summary in the bottom row,
      // set `destinationRow` to `0` (i.e. the last possible row)
      destinationRow: 0,
      destinationColumn: 2
    }
  ],
  afterGetRowHeader (row, TH) {
    //给最后一行头设置 为 '合计'
    if (row == this.countRows() - 1) {
      TH.innerHTML = '合计'
    }
  },

  afterFilter () {
    var columnSummaryPlugin = this.getPlugin('columnSummary')
    // columnSummaryPlugin.recalculateColumnSummary();
    console.log(columnSummaryPlugin)
  }
})
let data = [
  {
    id: null,
    name: '将剩',
    age: 12,
    big: true,
    date: ''
  },
  {
    id: 1,
    name: '将剩',
    age: 14,
    big: true,
    date: ''
  },
  {}
]
const hot = ref(null)
onMounted(() => {
  console.log(hot.value)
  const hotInstance = hot.value.hotInstance
  window.hotInstance = hotInstance
  console.log(hotInstance.getCell())
  const exportPlugin = hotInstance.getPlugin('exportFile')
})

function exportData () {
  const hotInstance = hot.value.hotInstance
  const exportPlugin = hotInstance.getPlugin('exportFile')
  exportPlugin.downloadFile('csv', {
    bom: false,
    columnDelimiter: ',',
    columnHeaders: true,
    exportHiddenColumns: true,
    exportHiddenRows: true,
    fileExtension: 'csv',
    filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
    mimeType: 'text/csv',
    rowDelimiter: '\r\n',
    rowHeaders: true
  })
}

function updateSettings (params) {
  const hotInstance = hot.value.hotInstance
  hotInstance.updateSettings({
    cell: [
      {
        row: 1,
        col: 0,
        className: 'custom-cell'
      }
    ]
  })
}

async function validate (params) {
  const hotInstance = hot.value.hotInstance
  //先取消所有列的过滤
  let filters = hotInstance.getPlugin('filters')
  filters.clearConditions()
  filters.filter()
  hotInstance.validateCells(a => {
    console.log(a)
  })
}

async function resetFilter () {
  const hotInstance = hot.value.hotInstance
  let filters = hotInstance.getPlugin('filters')
  filters.clearConditions()
  filters.filter()
}
</script>

<style lang="scss">
td.custom-cell {
  color: #fff;
  background-color: #37bc6c;
}
</style>
