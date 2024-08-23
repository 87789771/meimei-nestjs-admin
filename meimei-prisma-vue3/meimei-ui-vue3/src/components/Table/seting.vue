<!--
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-09-16 14:29:35
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-08-23 08:44:44
 * @FilePath: \meimei-prisma-vue3\meimei-ui-vue3\src\components\Table\seting.vue
 * @Description: 表格列设置组件
 * 
-->
<template>
  <el-dialog
    :modelValue="modelValue"
    title="表格设置"
    @update:modelValue="val => emits('update:modelValue', val)"
    destroy-on-close
    width="80%"
    :close-on-click-modal="false"
    append-to-body
    draggable
  >
    <el-form :model="form" ref="settingRef">
      <el-table
        :data="form.tableData"
        style="width: 100%"
        max-height="calc(100vh - 275px)"
        border
        class="js-table-seting"
        row-key="prop"
      >
        <el-table-column width="80" label="排序" align="center">
          <template #default>
            <el-icon class="drag-btn cursor-grab" @mouseenter="rowDrop"
              ><Grid
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column
          prop="label"
          label="列名"
          align="center"
          min-width="120"
        >
          <template #header>
            <div>
              <span style="color: #f56c6c">*</span>
              <span>列名</span>
            </div>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'tableData.' + $index + '.label'"
              :rules="{
                required: true,
                message: '请输入列名',
                trigger: 'blur'
              }"
            >
              <el-input v-model="row.label" placeholder="请输入列名" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="prop"
          label="字段"
          align="center"
          min-width="140"
        >
        </el-table-column>
        <el-table-column label="是否隐藏" align="center" min-width="100">
          <template #default="{ row }">
            <el-checkbox v-model="row.hide" />
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否不导出" align="center" min-width="100">
          <template #default="{ row }">
            <el-checkbox v-model="row.noExport" />
          </template>
        </el-table-column> -->
        <el-table-column label="列宽" align="center" min-width="180">
          <template #default="{ row }">
            <el-input-number v-model="row.minWidth" :min="1" :max="400" />
          </template>
        </el-table-column>
        <el-table-column label="对齐方式" align="center" min-width="220">
          <template #default="{ row }">
            <el-radio-group v-model="row.align">
              <el-radio value="left">左</el-radio>
              <el-radio value="center">居中</el-radio>
              <el-radio value="right">右</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="浮动方式" align="center" min-width="230">
          <template #default="{ row }">
            <el-radio-group v-model="row.fixed">
              <el-radio value="left">左</el-radio>
              <el-radio :value="false">不浮动</el-radio>
              <el-radio value="right">右</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="clickReset" style="float: left">重置</el-button>
        <el-button @click="emits('update:modelValue', false)">取消</el-button>
        <el-button
          type="primary"
          @click="clickConfirm"
          :loading="confirmLoading"
        >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { nextTick, reactive, toRefs, toValue, watchEffect } from 'vue'
import { deepClone } from '@/utils/index.js'
import Sortable from 'sortablejs'
import { addTableConfig, deleteTableConfig } from '@/api/system/user.js'
const { proxy } = getCurrentInstance()
const props = defineProps({
  modelValue: false,
  list: {
    type: Array,
    default: []
  },
  id: {
    type: String,
    required: true
  }
})
const { modelValue, list, id } = toRefs(props)
const emits = defineEmits(['update:modelValue', 'reset'])
const form = reactive({
  tableData: []
})
watchEffect(() => {
  if (modelValue.value) {
    let newArr = deepClone(list.value)
    form.tableData = newArr.map(item => {
      delete item.children
      return item
    })
  }
})
const tableKey = ref('')
const rowDrop = async event => {
  event.preventDefault()
  await nextTick()
  const wrapper = document.querySelector('.js-table-seting tbody')
  Sortable.create(wrapper, {
    animation: 300,
    handle: '.drag-btn',
    onEnd: async arg => {
      const { oldIndex, newIndex } = arg
      const currentRow = form.tableData.splice(oldIndex, 1)[0]
      form.tableData.splice(newIndex, 0, currentRow)
      tableKey.value = new Date().getDate()
    }
  })
}

//点击重置
function clickReset () {
  proxy.$modal
    .confirm('重置后将恢复表格默认设置，是否确认重置？')
    .then(() => {
      return deleteTableConfig({ tableId: toValue(id) })
    })
    .then(() => {
      emits('update:modelValue', false)
      emits('reset', '重置成功')
    })
    .catch(() => {})
}
/* 点击确定 */
const confirmLoading = ref(false)
function clickConfirm () {
  proxy.$refs['settingRef'].validate(valid => {
    if (valid) {
      confirmLoading.value = true
      let data = form.tableData.map((item, index) => {
        return Object.assign(toValue(item), { sort: index })
      })
      addTableConfig({
        tableId: toValue(id),
        tableJsonConfig: JSON.stringify(data)
      }).then(() => {
        emits('update:modelValue', false)
        emits('reset', '更新成功')
        confirmLoading.value = false
      })
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.cursor-grab) {
  cursor: move;
}
</style>
