<!--
 * @Author: sheng.jiang 87789771@qq.com
 * @Date: 2024-02-19 15:23:14
 * @LastEditors: sheng.jiang 87789771@qq.com
 * @LastEditTime: 2024-02-28 16:29:26
 * @FilePath: /耗材前端/src/views/basicData/supplierManagement/supplierCompare/index.vue
 * @Description: 供应商商品
 * 
-->
<template>
  <div class="app-container app-js df fdc">
    <el-form
      class="top-form"
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="供应商名称" prop="userName" class="label2">
        <deptSelect
          style="width: 207px"
          v-model="queryParams.hostpal"
          type="supplierList"
          clearable
        ></deptSelect>
      </el-form-item>
      <el-form-item label="商品信息" prop="userName">
        <AllInpult
          style="width: 207px"
          v-model="queryParams.hostpal"
        ></AllInpult>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col> -->
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <div class="f1">
      <JsTable
        id="supplierCompare_1"
        :columns="columns"
        ref="tableRef1"
        :data="tableData"
        width="100%"
      >
        <template #like="{ row }">
          <span>{{ row.type === 1 ? '你好' : '哈哈哈' }}</span>
        </template>
      </JsTable>
    </div>
  </div>
</template>

<script setup>
import { shallowReactive } from 'vue'

const columns = shallowReactive([
  {
    prop: '序号',
    label: '序号',
    type: 'index',
    minWidth: 60,
    align: 'center',
    showOverflowTooltip: false
  }
])
const data = reactive({
  loading: false,
  showSearch: true,
  open: false,
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10
  },
  rules: {
    userName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }]
  }
})

const { loading, showSearch, queryParams, form, rules, open } = toRefs(data)
/** 查询列表 */
function getList () {
  loading.value = true
  loading.value = false
}
/** 搜索按钮操作 */
function handleQuery () {
  queryParams.value.pageNum = 1
  getList()
}
/** 重置按钮操作 */
function resetQuery () {
  proxy.resetForm('queryRef')
  handleQuery()
}
getList()
</script>

<style lang="scss" scoped></style>
