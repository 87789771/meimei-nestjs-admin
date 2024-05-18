<!--
 * @Author: sheng.jiang 87789771@qq.com
 * @Date: 2024-02-19 15:22:26
 * @LastEditors: sheng.jiang 87789771@qq.com
 * @LastEditTime: 2024-02-28 15:00:50
 * @FilePath: /耗材前端/src/views/basicData/supplierManagement/supplierInformation/index.vue
 * @Description: 供应商基本信息
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
          <el-input
            v-model="queryParams.userName"
            placeholder="供应商名称"
            clearable
            style="width: 207px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <right-toolbar
          v-model:showSearch="showSearch"
          @queryTable="getList"
        ></right-toolbar>
      </el-row>
      <div class="f1">
        <JsTable
          id="basicData_supplierInformation_1"
          :columns="columns"
          :data="dataList"
          border
          v-loading="loading"
          width="100%"
          height="100%"
        >
          <template #操作="{ row }">
            <el-button
              link
              type="primary"
              @click="handleDetail(row)"
              v-hasPermi="['']"
              >查看</el-button
            >
            <el-button
              link
              type="primary"
              @click="handleUpdate(row)"
              v-hasPermi="['']"
              >修改</el-button
            >
          </template>
        </JsTable>
      </div>
      <pagination
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
      <el-dialog
        title="修改供应商基本信息"
              v-model="open"
      draggable
      :close-on-click-modal="false"
        width="600px"
        append-to-body
      >
        <el-form
          :model="form"
          :rules="rules"
          ref="supplierInformationRef"
          label-width="80px"
        >
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script setup name="supplierInformation">
  import { getCurrentInstance } from 'vue'
  
  const { proxy } = getCurrentInstance()
  const dataList = ref([1])
  const loading = ref(true)
  const showSearch = ref(true)
  const total = ref(0)
  // 列显隐信息
  const columns = shallowReactive([
    {
      prop: '序号',
      label: '序号',
      minWidth: 60,
      type: 'index',
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'key1',
      label: '供应商名称',
      minWidth: 300
    },
    {
      prop: 'key23',
      label: '唯一标识',
      minWidth: 300
    },
    {
      prop: 'key2',
      label: '组织编码',
      minWidth: 300
    },
    {
      prop: 'key3',
      label: '供应商院内码',
      minWidth: 300
    },
    {
      prop: 'key4',
      label: '省市县/区',
      minWidth: 300
    },
    {
      prop: 'key5',
      label: '详细地址',
      minWidth: 300
    },
    {
      prop: '操作',
      label: '操作',
      align: 'center',
      fixed: 'right',
      minWidth: 120,
      slot: '操作'
    }
  ])
  const data = reactive({
    open: false,
    form: {},
    queryParams: {
      pageNum: 1,
      pageSize: 10
    },
    rules: {
      userName: [
        { required: true, message: '用户名称不能为空', trigger: 'blur' },
        {
          min: 2,
          max: 20,
          message: '用户名称长度必须介于 2 和 20 之间',
          trigger: 'blur'
        }
      ]
    }
  })
  
  const { queryParams, form, rules, open } = toRefs(data)
  
  /** 查询用户列表 */
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
  /* 点击查看 */
  function handleDetail () {}
  
  /* 点击修改 */
  function handleUpdate () {
    reset()
  }
  /* 重置表单 */
  function reset () {
    form.value = {}
    proxy.resetForm('supplierInformationRef')
  }
  /** 取消按钮 */
  function cancel () {
    open.value = false
    reset()
  }
  getList()
  </script>
  
  <style lang="scss" scoped></style>
  