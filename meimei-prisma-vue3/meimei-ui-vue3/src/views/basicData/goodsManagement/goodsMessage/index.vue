<!--
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-10-02 15:50:59
 * @LastEditors: jiangSheng 87789771@qq.com
 * @LastEditTime: 2024-03-14 13:59:31
 * @FilePath: \耗材前端\src\views\basicData\goodsManagement\goodsMessage\index.vue
 * @Description: 
 * 
-->
<template>
  <div class="app-container app-js">
    <splitpane :splitSet="settingLR">
      <template #paneL>
        <!-- 自定义左侧面板的内容 -->
        <div class="df fdc h-100">
          <el-input
            v-model="query"
            placeholder="请输入分类名称"
            @input="onQueryChanged"
            prefix-icon="Search"
            clearable
          />
          <div class="f1 mt-10">
            <el-auto-resizer>
              <template #default="{ height }">
                <el-tree-v2
                  ref="treeRef"
                  :data="typeOptions"
                  :props="{ label: 'label', children: 'children' }"
                  highlight-current
                  :height="height"
                  :filter-method="filterMethod"
                  @node-click="handleNodeClick"
                  :expand-on-click-node="false"
                  :default-expanded-keys="defaultExpandedKeys"
                />
              </template>
            </el-auto-resizer>
          </div>
        </div>
      </template>
      <template #paneR>
        <!-- 再次将右侧面板进行拆分 -->
        <div class="h-100 df fdc">
          <el-form
            :model="queryParams"
            ref="queryRef"
            :inline="true"
            v-show="showSearch"
            class="top-form"
          >
            <el-form-item label="商品信息" prop="postCode">
              <AllInpult v-model="queryParams.all"></AllInpult>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="queryParams.status"
                placeholder="状态"
                clearable
                style="width: 200px"
              >
                <el-option
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery"
                >搜索</el-button
              >
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="Plus"
                @click="handleAdd"
                v-hasPermi="['']"
                >新增</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="warning"
                plain
                icon="Download"
                @click="handleExport"
                v-hasPermi="['']"
                >导出</el-button
              >
            </el-col>
            <right-toolbar
              v-model:showSearch="showSearch"
              @queryTable="getList"
            ></right-toolbar>
          </el-row>
          <div class="f1">
            <JsTable
              id="goodsMessage:1"
              :columns="columns"
              ref="tableRef1"
              :data="tableData"
              width="100%"
              height="100%"
              border
            >
              <template #status="{ row }">
                <dict-tag :options="sys_normal_disable" :value="row.status" />
              </template>
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
                <el-button
                  link
                  type="primary"
                  @click="handleCopy(row)"
                  v-hasPermi="['']"
                  >拷贝</el-button
                >
                <el-button
                  link
                  type="primary"
                  @click="handleDelete(row)"
                  v-hasPermi="['']"
                  >删除</el-button
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
        </div>
      </template>
    </splitpane>
  </div>
</template>
<script lang="jsx" setup name="GoodsMessage">
import splitpane from '@/components/ReSplitPane'
const { proxy } = getCurrentInstance()
const { sys_normal_disable } = proxy.useDict('sys_normal_disable')
proxy.$bus.on('goodsMessage-getList', a => {
  getList()
})
const router = useRouter()
const columns = shallowReactive([
  {
    prop: '序号',
    label: '序号',
    minWidth: 60,
    fixed: 'left',
    type: 'index',
    align: 'center'
  },
  {
    prop: '商品名称',
    label: '商品名称',
    minWidth: 200
  },
  {
    prop: '商品编码',
    label: '商品编码',
    minWidth: 200
  },
  {
    prop: '院内码',
    label: '院内码',
    minWidth: 200
  },
  {
    prop: '规格',
    label: '规格',
    minWidth: 300
  },
  {
    prop: '型号',
    label: '型号',
    minWidth: 300
  },
  {
    prop: 'status',
    label: '状态',
    slot: 'status',
    minWidth: 80,
    align: 'center',
    fixed: 'right'
  },
  {
    prop: '操作',
    label: '操作',
    minWidth: 200,
    fixed: 'right',
    align: 'center',
    slot: '操作'
  }
])
const defaultExpandedKeys = ref()
const loading = ref(true)
const showSearch = ref(true)
const tableData = ref([
  {
    id: 1
  }
])
const settingLR = reactive({
  minPercent: 3,
  defaultPercent: 15,
  split: 'vertical'
})

const treeRef = ref(null)
const query = ref('')
const queryParams = ref({})
const total = ref(0)
const typeOptions = ref([
  {
    id: 1,
    label: '测试Dfsfsdfsdfsdfdsdfsd',
    children: [
      {
        id: 2,
        label: '测试2的地方神鼎飞丹砂防守打法'
      },
      {
        id: 3,
        label: '测试3测试2的地方神鼎飞丹砂防守打法'
      },
      {
        id: 3,
        label: '测试3测试2的地方神鼎飞丹砂防守打法'
      },
      {
        id: 3,
        label: '测试3测试2的地方神鼎飞丹砂防守打法'
      },
      {
        id: 3,
        label: '测试3测试2的地方神鼎飞丹砂防守打法'
      },
      {
        id: 3,
        label: '测试3测试2的地方神鼎飞丹砂防守打法'
      }
    ]
  }
])
function onQueryChanged (query) {
  treeRef.value.filter(query)
}
function filterMethod (query, node) {
  return node.label.includes(query)
}
function getList () {}
/** 节点单击事件 */
function handleNodeClick (data) {
  // queryParams.value.deptId = data.id
  handleQuery()
}

/** 重置按钮操作 */
function resetQuery () {
  proxy.resetForm('queryRef')
  handleQuery()
}

/* 检索 */
function handleQuery () {
  queryParams.value.pageNum = 1
  getList()
}

/* 修改 */
function handleUpdate (row) {
  router.push({
    path: '/basicData/goodsManagement-custom/addGoodsMessage/edit/' + row.id
  })
}

/* 拷贝 */
function handleCopy (row) {
  router.push({
    path: '/basicData/goodsManagement-custom/addGoodsMessage/add/' + +row.id
  })
}

/* 删除 */
function handleDelete (row) {}

/* 新增 */
function handleAdd (row) {
  router.push({
    path: '/basicData/goodsManagement-custom/addGoodsMessage/add/0'
  })
}

/* 查看详情 */
function handleDetail (row) {
  router.push({
    path: '/basicData/goodsManagement-custom/goodsMessageDetails/' + row.id
  })
}
function handleExport (row) {}
</script>

<style lang="scss" scoped></style>
