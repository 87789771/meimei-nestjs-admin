<!--
 * @Author: sheng.jiang 87789771@qq.com
 * @Date: 2023-09-12 09:06:46
 * @LastEditors: sheng.jiang 87789771@qq.com
 * @LastEditTime: 2023-09-14 14:21:10
 * @FilePath: \ruoyi-ui-3.0-print\src\components\Print\operate.vue
 * @Description: 顶部操作按钮
 * 
-->
<template>
  <div>
    <el-form inline>
      <el-form-item>
        <el-button-group>
          <el-button
            v-for="item in paperTypes"
            :type="curPaper.type === item.type ? 'primary' : ''"
            :key="item.type"
            @click="setPaper(item)"
            >{{ item.type }}</el-button
          >
          <el-popover placement="bottom" :width="190" trigger="click">
            <template #reference>
              <el-button :type="curPaper.type === 'other' ? 'primary' : ''"
                >自定义纸张</el-button
              >
            </template>
            <template #default>
              <div class="numBox">
                <span>宽度</span>
                <el-input-number
                  size="small"
                  v-model="paperWidth"
                  :min="10"
                  :max="10000"
                  placeholder="宽(mm)"
                />
              </div>
              <div class="numBox">
                <span>高度</span>
                <el-input-number
                  size="small"
                  v-model="paperHeight"
                  :min="10"
                  :max="10000"
                  placeholder="高(mm)"
                />
              </div>
              <el-button
                type="primary"
                size="small"
                style="width: 100%"
                @click="otherPaper"
                >确定</el-button
              >
            </template>
          </el-popover>
        </el-button-group>
      </el-form-item>
      <el-form-item>
        <el-button icon="ZoomOut" @click="changeScale(false)"></el-button>
        <el-input
          :value="scaleValueFormat"
          placeholder="百分比"
          style="width: 70px; margin: 0 3px"
          disabled
          :input-style="{
            textAlign: 'center'
          }"
        >
        </el-input>
        <el-button icon="ZoomIn" @click="changeScale(true)"></el-button>
        <el-button icon="RefreshLeft" type="primary" @click="rotatePaper"
          >旋转</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button plain icon="EditPen" type="primary" @click="editTemplate"
          >编辑模板JSON</el-button
        >
      </el-form-item>
      <el-form-item>
        <!-- <el-button icon="View" type="primary" @click="preView">预览</el-button> -->
        <el-button icon="Memo" type="primary" @click="apiPrint">保存</el-button>
        <el-popconfirm title="是否确认清空?" @confirm="clearPaper">
          <template #reference>
            <el-button icon="Delete" type="danger">清空</el-button>
          </template>
        </el-popconfirm>
      </el-form-item>
      <el-form-item>
        <el-button @click="clickClose">关闭</el-button>
      </el-form-item>
    </el-form>
    <!-- 模板编辑弹框 -->
    <el-dialog v-model="jsonShow" title="模版JSON" width="1000">
      <template #header>
        <div class="my-header">
          <span>模版JSON</span>
          <el-switch
            v-model="tidMode"
            class="ml-2"
            inline-prompt
            style="--el-switch-on-color: #13ce66"
            active-text="tid模式"
            inactive-text="默认"
            @change="onModeChange"
          />
          <el-switch
            v-model="beautify"
            class="ml-2"
            :active-value="2"
            :inactive-value="0"
            inline-prompt
            style="--el-switch-on-color: #13ce66"
            active-text="美化"
            inactive-text="压缩"
            @change="onModeChange"
          />
        </div>
      </template>
      <el-input
        v-loading="jsonLoading"
        type="textarea"
        v-model="jsonContent"
        rows="20"
      ></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="jsonShow = false">取消</el-button>
          <el-button type="primary" @click="editConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 预览模版 -->
    <el-dialog
      v-model="preViewShow"
      title="打印预览"
      width="1000"
      destroy-on-close
    >
      <div id="preview_content_design"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="preViewShow = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useSwitchPaper } from './switchPaper'
import { useChangeScale } from './changeScale'
import { useTemplate } from './template'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const $router = useRouter()
const props = defineProps({
  hiprintTemplate: {
    type: Object,
    required: true
  }
})
/* 切换纸张大小 */
const { paperTypes, curPaper, otherPaper, setPaper, paperWidth, paperHeight } =
  useSwitchPaper(props.hiprintTemplate)
/* 缩放 */
const { scaleValueFormat, changeScale } = useChangeScale(props.hiprintTemplate)
/* 编辑模板JSON, 预览模板 */
const {
  jsonLoading,
  jsonShow,
  jsonContent,
  editTemplate,
  editConfirm,
  preViewShow,
  preView,
  tidMode,
  beautify,
  onModeChange
} = useTemplate(props.hiprintTemplate)
/* 旋转 */
function rotatePaper () {
  props.hiprintTemplate.rotatePaper()
}
/* 清空模板 */
function clearPaper () {
  try {
    props.hiprintTemplate.clear()
  } catch (error) {
    ElMessage.error(`操作失败: ${error}`)
  }
}
/* 打印 */
function apiPrint () {
  props.hiprintTemplate.print([
    { barcode: '123' },
    { barcode: '456' },
    { barcode: '789' }
  ])
}
/* 关闭 */
function clickClose () {
  $router.go(-1)
}
</script>
<style lang="scss" scoped>
.numBox {
  margin-bottom: 5px;
  span {
    margin-right: 15px;
  }
}
.my-header {
  display: flex;
  align-items: center;
  & > span {
    margin-right: 20px;
  }
  & > div {
    margin-right: 10px;
  }
}
</style>
