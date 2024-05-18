<template>
  <el-dialog
    v-model="model"
    :title="title"
    draggable
    :close-on-click-modal="false"
    width="600px"
    append-to-body
  >
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineModel } from 'vue'
const props = defineProps({
  // 编辑时的id
  id: {
    type: String | Number | undefined
  }
})
const model = defineModel({ required: true })
const title = ref('新增货架')
watch(
  () => props.id,
  (newValue, oldValue) => {
    if (newValue) {
      title.value = '编辑货架'
    }
  }
)
function submitForm () {}
function cancel () {
  model.value = false
}
</script>

<style lang="scss" scoped></style>
