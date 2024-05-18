<template>
  <div class="app-container app-js df fdc">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入部门名称"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="部门状态"
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
          v-hasPermi="['system:dept:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll"
          >展开/折叠</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <div class="f1">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            v-loading="loading"
            expand-column-key="deptName"
            v-model:expanded-row-keys="expandedRowKeys"
            :columns="columns"
            :data="deptList"
            :width="width"
            :height="height"
            row-key="deptId"
            fixed
          />
        </template>
      </el-auto-resizer>
    </div>

    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title"       v-model="open"
      draggable
      :close-on-click-modal="false" width="650px" append-to-body>
      <el-form ref="deptRef" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24" v-if="form.parentId !== null">
            <el-form-item label="上级部门" prop="parentId">
              <el-tree-select
                v-model="form.parentId"
                :data="deptOptions"
                :props="{
                  value: 'deptId',
                  label: 'deptName',
                  children: 'children'
                }"
                value-key="deptId"
                placeholder="选择上级部门"
                check-strictly
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="form.deptName" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="leader">
              <el-input
                v-model="form.leader"
                placeholder="请输入负责人"
                maxlength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="form.phone"
                placeholder="请输入联系电话"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.value"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
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

<script lang="jsx" setup name="Dept">
import {
  listDept,
  getDept,
  delDept,
  addDept,
  updateDept,
  listDeptExcludeChild
} from '@/api/system/dept'

const { proxy } = getCurrentInstance()
const { sys_normal_disable, sys_dept_type } = proxy.useDict(
  'sys_normal_disable',
  'sys_dept_type'
)

const deptList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const title = ref('')
const deptOptions = ref([])
const isExpandAll = ref(false)
const refreshTable = ref(true)
const parseTime = proxy.parseTime
const expandedRowKeys = shallowRef([])
const columns = ref([
  {
    dataKey: 'deptName',
    key: 'deptName',
    title: '部门名称',
    width: 300
  },
  {
    dataKey: 'orderNum',
    key: 'orderNum',
    title: '排序',
    width: 200,
    align: 'center'
  },
  {
    dataKey: 'status',
    key: 'status',
    title: '状态',
    width: 200,
    align: 'center',
    cellRenderer: ({ cellData }) => (
      <dict-tag options={sys_normal_disable.value} value={cellData} />
    )
  },
  {
    dataKey: 'createTime',
    key: 'createTime',
    title: '创建时间',
    align: 'center',
    width: 300,
    cellRenderer: ({ cellData }) => <span>{parseTime(cellData)}</span>
  },
  {
    key: 'operate',
    title: '操作',
    width: 230,
    align: 'center',
    fixed: 'right',
    cellRenderer: ({ rowData }) => (
      <>
        <el-button
          link
          type='primary'
          icon='Edit'
          v-hasPermi={[['system:dept:edit']]}
          onClick={event => {
            handleUpdate(rowData)
          }}
        >
          修改
        </el-button>
        <el-button
          link
          type='primary'
          icon='Plus'
          v-hasPermi={[['system:dept:add']]}
          onClick={event => {
            handleAdd(rowData)
          }}
        >
          新增
        </el-button>
        <el-button
          link
          type='primary'
          icon='Delete'
          v-hasPermi={[['system:dept:remove']]}
          onClick={event => {
            handleDelete(rowData)
          }}
        >
          删除
        </el-button>
      </>
    )
  }
])

const data = reactive({
  form: {},
  queryParams: {
    deptName: undefined,
    status: undefined
  },
  rules: {
    parentId: [
      { required: true, message: '上级部门不能为空', trigger: 'blur' }
    ],
    deptName: [
      { required: true, message: '部门名称不能为空', trigger: 'blur' }
    ],
    orderNum: [
      { required: true, message: '显示排序不能为空', trigger: 'blur' }
    ],
    email: [
      {
        type: 'email',
        message: '请输入正确的邮箱地址',
        trigger: ['blur', 'change']
      }
    ],
    phone: [
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur'
      }
    ]
  }
})

const { queryParams, form, rules } = toRefs(data)

/** 查询部门列表 */
function getList () {
  loading.value = true
  listDept(queryParams.value).then(response => {
    allRowKeys.value = response.data.map(item => item.deptId)
    deptList.value = proxy.handleTree(response.data, 'deptId')
    loading.value = false
  })
}
/** 取消按钮 */
function cancel () {
  open.value = false
  reset()
}
/** 表单重置 */
function reset () {
  form.value = {
    deptId: undefined,
    parentId: undefined,
    deptName: undefined,
    orderNum: 0,
    leader: undefined,
    phone: undefined,
    email: undefined,
    status: '0'
  }
  proxy.resetForm('deptRef')
}
/** 搜索按钮操作 */
function handleQuery () {
  getList()
}
/** 重置按钮操作 */
function resetQuery () {
  proxy.resetForm('queryRef')
  handleQuery()
}
/** 新增按钮操作 */
function handleAdd (row) {
  reset()
  listDept().then(response => {
    deptOptions.value = proxy.handleTree(response.data, 'deptId')
  })
  if (row != undefined) {
    form.value.parentId = row.deptId
  }
  open.value = true
  title.value = '添加部门'
}
let allRowKeys = shallowRef([])
/** 展开/折叠操作 */
function toggleExpandAll () {
  if (!isExpandAll.value) {
    expandedRowKeys.value = allRowKeys.value
  } else {
    expandedRowKeys.value = []
  }
  isExpandAll.value = !isExpandAll.value
}
/** 修改按钮操作 */
function handleUpdate (row) {
  reset()
  listDeptExcludeChild(row.deptId).then(response => {
    deptOptions.value = proxy.handleTree(response.data, 'deptId')
  })
  getDept(row.deptId).then(response => {
    form.value = response.data
    open.value = true
    title.value = '修改部门'
  })
}
/** 提交按钮 */
function submitForm () {
  proxy.$refs['deptRef'].validate(valid => {
    if (valid) {
      if (form.value.deptId != undefined) {
        updateDept(form.value).then(response => {
          proxy.$modal.msgSuccess('修改成功')
          open.value = false
          getList()
        })
      } else {
        addDept(form.value).then(response => {
          proxy.$modal.msgSuccess('新增成功')
          open.value = false
          getList()
        })
      }
    }
  })
}
/** 删除按钮操作 */
function handleDelete (row) {
  proxy.$modal
    .confirm('是否确认删除名称为"' + row.deptName + '"的数据项?')
    .then(function () {
      return delDept(row.deptId)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}

getList()
</script>
