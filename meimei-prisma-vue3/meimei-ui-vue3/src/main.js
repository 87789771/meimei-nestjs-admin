/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-09-14 20:28:37
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-18 12:07:23
 * @FilePath: /meimei-new-vue/src/main.js
 * @Description: 主入口
 * 
 */
import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/variables.module.scss' // global css
import 'element-plus/theme-chalk/index.css' // global css

import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive

// 事件总线
import mitt from 'mitt'

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'

import './permission' // permission control

import { useDict } from '@/utils/dict'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/mei-mei'

//拖拽布局
import Splitpane from '@/components/ReSplitPane'
// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect'
// 字典标签组件
import DictTag from '@/components/DictTag'
// 自定义表格组件
import JsTable from '@/components/Table/index.jsx'
// 打印机
import { hiPrintPlugin } from 'vue-plugin-hiprint'
hiPrintPlugin.disAutoConnect(); // 取消自动连接直接打印客户端
const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.$bus = mitt()
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels
// 全局组件挂载
app.component('Splitpane', Splitpane)
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('TreeSelect', TreeSelect)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)
app.component('Editor', Editor)
app.component('JsTable', JsTable)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.use(hiPrintPlugin, '$hiprint')
app.component('svg-icon', SvgIcon)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: zhCn,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default'
})

app.mount('#app')
