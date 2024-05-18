<!--
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-10-02 15:50:59
 * @LastEditors: jiangSheng 87789771@qq.com
 * @LastEditTime: 2024-03-15 10:09:28
 * @FilePath: \耗材前端\src\views\basicData\goodsManagement\goodsClassification\index.vue
 * @Description: 商品分类信息
 * 
-->
<template>
  <div class="app-container app-js df fdc">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="分类信息" prop="configName">
        <el-input
          v-model="queryParams.configName"
          placeholder="分类名称/院内码"
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
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd"
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
            border
            expand-column-key="classId"
            v-model:expanded-row-keys="expandedRowKeys"
            :columns="columns"
            :data="dataList"
            :width="width"
            :height="height"
            row-key="classId"
          />
        </template>
      </el-auto-resizer>
    </div>

    <!-- 添加或修改菜单对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      draggable
      :close-on-click-modal="false"
      width="680px"
      append-to-body
    >
      <el-form ref="classRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级分类">
              <el-tree-select
                v-model="form.parentId"
                :data="classOptions"
                :props="{
                  value: 'classId',
                  label: 'className',
                  children: 'children'
                }"
                value-key="classId"
                placeholder="选择上级分类"
                check-strictly
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所属医院">
              <deptSelect
                v-model="form.hostpal"
                type="hospitalList"
              ></deptSelect>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分类名称" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="分类名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="院内码" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="院内码"
                maxlength="30"
              />
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

<script lang="jsx" setup name="GoodsClassification">
import { ref, shallowRef } from 'vue'
const { proxy } = getCurrentInstance()

const showSearch = ref(true)
const queryParams = ref({})
const expandedRowKeys = shallowRef([])
const columns = [
  {
    title: '所属医院',
    key: 'deptName',
    dataKey: 'deptName',
    minWidth: 200
  },
  {
    title: '分类名称',
    key: 'className',
    dataKey: 'className',
    minWidth: 300
  },
  {
    title: '院内码',
    key: 'deptClassCode',
    dataKey: 'deptClassCode',
    minWidth: 180,
    align: 'center'
  },
  {
    title: '编码',
    key: 'deptClassCode',
    dataKey: 'deptClassCode',
    minWidth: 180,
    align: 'center'
  },
  {
    title: '备注',
    key: 'remark',
    dataKey: 'remark',
    minWidth: 200
  },
  {
    title: '操作',
    key: '操作',
    minWidth: 200,
    align: 'center',
    fixed: 'right',
    cellRenderer: () => {
      ;<>
        <el-button
          link
          type='primary'
          icon='Edit'
          v-hasPermi={[['']]}
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
          v-hasPermi={[['']]}
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
          v-hasPermi={[['']]}
          onClick={event => {
            handleDelete(rowData)
          }}
        >
          删除
        </el-button>
      </>
    }
  }
]
const data = reactive({
  title: '添加商品分类',
  open: true,
  form: {},
  rules: {},
  classOptions: [],
  isExpandAll: false
})
const { title, open, form, rules, classOptions, isExpandAll } = toRefs(data)
const dataList = ref([])
function handleQuery () {}
function getList () {}
function resetQuery () {
  proxy.resetForm('queryRef')
  handleQuery()
}
/* 点击新增 */
function handleAdd (row) {
  reset()
  open.value = true
  getTreeselect()
  if (row != null && row.classId) {
    form.value.parentId = row.classId
  } else {
    form.value.parentId = 0
  }
  open.value = true
  title.value = '添加商品分类'
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
async function handleUpdate (row) {
  reset()
  await getTreeselect()
  // getclass(row.classId).then(response => {
  //   form.value = response.data
  //   open.value = true
  //   title.value = '修改商品分类'
  // })
}
/** 提交按钮 */
function submitForm () {
  proxy.$refs['classRef'].validate(valid => {
    if (valid) {
      if (form.value.classId != undefined) {
        // updateclass(form.value).then(response => {
        //   proxy.$modal.msgSuccess('修改成功')
        //   open.value = false
        //   getList()
        // })
      } else {
        // addclass(form.value).then(response => {
        //   proxy.$modal.msgSuccess('新增成功')
        //   open.value = false
        //   getList()
        // })
      }
    }
  })
}
/** 表单重置 */
function reset () {
  form.value = {
    classId: undefined,
    deptId: undefined,
    className: undefined,
    parentId: 0,
    deptClassCode: undefined,
    remark: undefined
  }
  proxy.resetForm('classRef')
}
/* 点击删除 */
function handleDelete () {
  getList()
}

/** 查询分类下拉树结构 */
function getTreeselect () {
  classOptions.value = []
  // listclass().then(response => {
  //   const classObj = { classId: 0, className: '主类目', children: [] }
  //   classObj.children = proxy.handleTree(response.data, 'classId')
  //   classOptions.value.push(classObj)
  // })
}
/** 取消按钮 */
function cancel () {
  open.value = false
  reset()
}
</script>

<style lang="scss" scoped></style>
