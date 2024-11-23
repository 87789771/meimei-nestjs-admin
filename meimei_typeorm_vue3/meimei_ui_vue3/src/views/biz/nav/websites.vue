<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="字典名称" prop="dictType">
        <el-select v-model="queryParams.dictType" style="width: 200px">
          <el-option v-for="item in typeOptions" :key="item.dictId" :label="item.dictName" :value="item.dictType" />
        </el-select>
      </el-form-item>
      <el-form-item label="字典标签" prop="dictLabel">
        <el-input
          v-model="queryParams.dictLabel"
          placeholder="请输入字典标签"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="数据状态" clearable style="width: 200px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:dict:add']">新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:dict:edit']"
          >修改</el-button
        >
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:dict:remove']"
          >删除</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:dict:export']"
          >导出</el-button
        >
      </el-col> -->
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Close" @click="handleClose">关闭</el-button>
      </el-col>
      <!-- <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="网站名称" align="center" prop="name" />
      <el-table-column label="url" align="center" prop="url" />
      <el-table-column label="描述" align="center" prop="description" :show-overflow-tooltip="true" />
      <el-table-column label="color" align="center" prop="color" />
      <el-table-column label="排序" align="center" prop="sort" />
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dict:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="dataRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入网站名称" />
        </el-form-item>
        <el-form-item label="url" prop="url">
          <el-input v-model="form.url" placeholder="请输入 url" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="color" prop="color">
          <el-input v-model="form.color" placeholder="请输入背景颜色" />
        </el-form-item>
        <el-form-item label="显示排序" prop="sort">
          <el-input-number v-model="form.sort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Data">
import useDictStore from '@/store/modules/dict'
import {
  listNavCategory,
  addNavCategory,
  getNavCategory,
  updateNavCategory,
  listNavCategoryWebsites,
  addWebsite,
  getWebsite,
  updateWebsite,
  delWebsite,
} from '@/api'
import { optionselect as getDictOptionselect, getType } from '@/api/system/dict/type'
import { listData, getData, delData, addData, updateData } from '@/api/system/dict/data'

const { proxy } = getCurrentInstance()
const { sys_normal_disable } = proxy.useDict('sys_normal_disable')

const dataList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(false)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref('')
const defaultDictType = ref('')
const typeOptions = ref([])
const route = useRoute()
// 数据标签回显样式
const listClassOptions = ref([
  { value: 'default', label: '默认' },
  { value: 'primary', label: '主要' },
  { value: 'success', label: '成功' },
  { value: 'info', label: '信息' },
  { value: 'warning', label: '警告' },
  { value: 'danger', label: '危险' },
])

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
  rules: {
    name: [{ required: true, message: '网站名称不能为空', trigger: 'blur' }],
    url: [{ required: true, message: 'url不能为空', trigger: 'blur' }],
    description: [{ required: false, message: '描述不能为空', trigger: 'blur' }],
    dictValue: [{ required: true, message: '数据键值不能为空', trigger: 'blur' }],
    sort: [{ required: true, message: '数据顺序不能为空', trigger: 'blur' }],
  },
})

const { queryParams, form, rules } = toRefs(data)

/** 查询字典数据列表 */
function getList() {
  loading.value = true
  listNavCategoryWebsites(route.params.id, queryParams.value).then((response) => {
    dataList.value = response.data.rows
    total.value = response.data.total
    loading.value = false
  })
}
/** 取消按钮 */
function cancel() {
  open.value = false
  reset()
}
/** 表单重置 */
function reset() {
  form.value = {
    id: undefined,
    name: undefined,
    url: undefined,
    description: undefined,
    color: undefined,
    sort: 0,
    categoryId: parseInt(route.params.id),
    remark: undefined,
  }
  proxy.resetForm('dataRef')
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}
/** 返回按钮操作 */
function handleClose() {
  const obj = { path: '/biz/nav' }
  proxy.$tab.closeOpenPage(obj)
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm('queryRef')
  queryParams.value.dictType = defaultDictType.value
  handleQuery()
}
/** 新增按钮操作 */
function handleAdd() {
  reset()
  open.value = true
  title.value = '添加字典数据'
  form.value.dictType = queryParams.value.dictType
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset()
  const id = row.id || ids.value
  getWebsite(id).then((response) => {
    form.value = response.data
    open.value = true
    title.value = '修改'
  })
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs['dataRef'].validate((valid) => {
    if (valid) {
      if (form.value.id != undefined) {
        updateWebsite(form.value.id, form.value).then((response) => {
          // useDictStore().removeDict(queryParams.value.dictType)
          proxy.$modal.msgSuccess('修改成功')
          open.value = false
          getList()
        })
      } else {
        addWebsite(form.value).then((response) => {
          // useDictStore().removeDict(queryParams.value.dictType)
          proxy.$modal.msgSuccess('新增成功')
          open.value = false
          getList()
        })
      }
    }
  })
}
/** 删除按钮操作 */
function handleDelete(row) {
  const dataIds = row.id || ids.value
  proxy.$modal
    .confirm('是否确认删除"' + dataIds + '"的数据项？')
    .then(function () {
      return delWebsite(dataIds)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('删除成功')
      useDictStore().removeDict(queryParams.value.dictType)
    })
    .catch(() => {})
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    'system/dict/data/export',
    {
      ...queryParams.value,
    },
    `dict_data_${new Date().getTime()}.xlsx`,
  )
}

if (route?.params?.id) {
  getList()
}
</script>
