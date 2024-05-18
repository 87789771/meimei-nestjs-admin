<!--
 * @Author: sheng.jiang 87789771@qq.com
 * @Date: 2023-09-11 15:04:00
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-01-11 22:01:19
 * @FilePath: /耗材前端/src/components/Print/index.vue
 * @Description: 打印插件
 * 
-->
<template>
  <div>
    <operate
      :hiprintTemplate="hiprintTemplate"
      v-if="hiprintTemplate"
    ></operate>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-card>
          <div class="hiprintEpContainer rect-printElement-types"></div>
        </el-card>
      </el-col>
      <el-col :span="14"
        ><el-card class="card-design"
          ><div id="hiprint-printTemplate"></div></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card> <div id="PrintElementOptionSetting"></div> </el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script setup>
import operate from './operate.vue'
import { getCurrentInstance, onMounted, shallowRef } from 'vue'
import { aProvider } from './providers.js'
const { proxy } = getCurrentInstance()
const hiprint = proxy.$hiprint
onMounted(() => {
  init()
})
let hiprintTemplate = shallowRef(null)
/* 初始化 */
function init () {
  hiprint.init({
    providers: [aProvider()]
  })
  /* 构建可拖拽元素 */
  $('.hiprintEpContainer').empty()
  hiprint.PrintElementTypeManager.build(
    '.hiprintEpContainer',
    'aProviderModule'
  )
  /* 构建设计器 */
  $('#hiprint-printTemplate').empty() // 先清空, 避免重复构建
  hiprintTemplate.value = new hiprint.PrintTemplate({
    settingContainer: '#PrintElementOptionSetting' // 元素参数容器
  })
  hiprintTemplate.value.design('#hiprint-printTemplate')
}
</script>

<style lang="scss" scoped>
:deep(.hiprint-printElement-type) > li > ul > li > a {
  padding: 4px 4px;
  color: #1296db;
  line-height: 1;
  height: auto;
  text-overflow: ellipsis;
}

:deep(.hiprint-printElement-image-content) {
  img {
    content: url('~@/assets/logo/logo.png');
  }
}

// 设计容器
.card-design {
  overflow: hidden;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
