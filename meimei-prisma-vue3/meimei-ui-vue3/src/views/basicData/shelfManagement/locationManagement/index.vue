<!--
 * @Author: jiangSheng 87789771@qq.com
 * @Date: 2024-03-14 15:45:48
 * @LastEditors: jiangSheng 87789771@qq.com
 * @LastEditTime: 2024-03-15 15:03:34
 * @FilePath: \耗材前端\src\views\basicData\shelfManagement\locationManagement\index.vue
 * @Description: 库位管理
 * 
-->
<template>
  <div class="app-container app-js">
    <splitpane :splitSet="settingLR">
      <template #paneL>
        <div class="df fdc h-100">
          <div class="df">
            <el-input
              class="f1"
              v-model="searchObj.name"
              placeholder="请输入名称"
              clearable
              prefix-icon="Search"
              @input="onQueryChanged"
            />
            <el-button
              class="ml-10"
              type="primary"
              icon="Plus"
              plain
              @click="handleAdd"
              >新增</el-button
            >
          </div>
          <el-select
            class="mt-10"
            v-model="searchObj.status"
            placeholder="货区类型"
            clearable
            @change="onQueryChanged"
          >
            <el-option
              v-for="dict in basic_inital_region"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
          <el-select
            class="mt-10"
            v-model="searchObj.status"
            placeholder="存储类型"
            clearable
            @change="onQueryChanged"
          >
            <el-option
              v-for="dict in basic_goods_storage"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
          <div class="f1 mt-10">
            <el-auto-resizer>
              <template #default="{ height }">
                <el-tree-v2
                  ref="deptTreeRef"
                  :data="deptOptions"
                  :props="{ label: 'label', children: 'children' }"
                  highlight-current
                  :height="height"
                  :filter-method="filterMethod"
                  @node-click="handleNodeClick"
                  :expand-on-click-node="false"
                />
              </template>
            </el-auto-resizer>
          </div>
        </div>
      </template>
      <template #paneR>
        <div class="h-100 df fdc">
          <el-form
            class="top-form"
            :model="queryParams"
            ref="queryRef"
            :inline="true"
            v-show="showSearch"
            label-width="68px"
          >
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="queryParams.status"
                placeholder="用户状态"
                clearable
                style="width: 207px"
              >
                <el-option
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="库位信息" prop="userName">
              <el-input
                v-model="queryParams.userName"
                placeholder="库位信息"
                clearable
                style="width: 207px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item label="专属商品信息" class="label2" prop="userName">
              <AllInpult
                v-model="queryParams.userName"
                placeholder="专属商品信息"
                clearable
                style="width: 207px"
                @keyup.enter="handleQuery"
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
            <right-toolbar
              v-model:showSearch="showSearch"
              @queryTable="getList"
            ></right-toolbar>
          </el-row>
          <div class="f1">
            <JsTable
              id="basicData_locationManagement_1"
              :columns="columns"
              :data="dataList"
              border
              v-loading="loading"
              width="100%"
              height="100%"
            >
            </JsTable>
          </div>
          <pagination
            :total="total"
            v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize"
            @pagination="getList"
            :selection="ids.length"
          />
        </div>
      </template>
    </splitpane>
    <addShelfDialog v-model="addShelfDialogOpen" :id="editId"></addShelfDialog>
  </div>
</template>

<script setup name="LocationManagement">
import { reactive, shallowReactive, toRefs } from 'vue'
import addShelfDialog from './components/addShelfDialog.vue'
const { proxy } = getCurrentInstance()
const { sys_normal_disable, basic_inital_region, basic_goods_storage } =
  proxy.useDict(
    'sys_normal_disable',
    'basic_inital_region',
    'basic_goods_storage'
  )
const settingLR = reactive({
  minPercent: 3,
  defaultPercent: 18,
  split: 'vertical'
})
const searchObj = reactive({
  name: '',
  name2: '',
  name3: ''
})
const deptOptions = ref([])
const loading = ref(false)
const showSearch = ref(true)
const ids = ref([])
const total = ref(0)
const data = reactive({
  queryParams: { pageNum: 1, pageSize: 10 },
  addShelfDialogOpen: false,
  editId: undefined
})
const { queryParams, addShelfDialogOpen, editId } = toRefs(data)
const dataList = ref([])
const columns = shallowReactive([
  {
    prop: '勾选框',
    label: '勾选框',
    type: 'selection',
    minWidth: 40,
    align: 'center',
    showOverflowTooltip: false,
    fixed: 'left'
  },
  {
    type: 'index',
    label: '序号',
    minWidth: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    prop: 'userName',
    label: '货架ID',
    minWidth: 100
  },
  {
    prop: 'userName',
    label: '货架名称',
    minWidth: 100
  },
  {
    prop: 'userName',
    label: '库位ID',
    minWidth: 100
  },
  {
    prop: 'userName',
    label: '库位编码',
    minWidth: 100
  },
  {
    prop: 'userName',
    label: '货区类型',
    minWidth: 100
  },
  {
    prop: 'userName',
    label: '库位容量',
    minWidth: 100
  },
  {
    prop: 'userName',
    label: '专属商品名称',
    minWidth: 100
  },
  {
    prop: 'userName',
    label: '专属商品编码',
    minWidth: 100
  },
  {
    prop: 'userName',
    label: '状态',
    minWidth: 100
  }
])
/** 通过条件过滤节点  */
function filterMethod (query, node) {
  console.log(query)
  return
  return node.label.includes(query)
}
/** 节点单击事件 */
function handleNodeClick (data) {
  queryParams.value.deptId = data.id
  handleQuery()
}
/** 搜索按钮操作 */
function handleQuery () {
  queryParams.value.pageNum = 1
  getList()
}
/** 重置按钮操作 */
function resetQuery () {
  dateRange.value = []
  proxy.resetForm('queryRef')
  queryParams.value.deptId = undefined
  proxy.$refs.deptTreeRef.setCurrentKey(null)
  handleQuery()
}
/* 加载数据 */
function getList () {}
/** 根据名称筛选部门树 */
function onQueryChanged (query) {
  proxy.$refs['deptTreeRef'].filter(searchObj)
}
/* 点击新增 */
function handleAdd (row) {
  addShelfDialogOpen.value = true
}

/* 点击编辑 */
function handEdit (row) {
  addShelfDialogOpen.value = true
}
</script>

<style lang="scss" scoped></style>
