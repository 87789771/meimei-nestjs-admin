<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <div class="tip" :class="{ tipSmall: appStore.size === 'small' }">
      <span v-if="selection !== undefined">共选择 {{ selection }} 条</span>
    </div>
    <el-pagination
      :small="appStore.size === 'small'"
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { scrollTo } from '@/utils/scroll-to'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()

const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 15
  },
  pageSizes: {
    type: Array,
    default () {
      return [15, 50, 200, 500]
    }
  },
  // 移动端页码按钮的数量端默认值5
  pagerCount: {
    type: Number,
    default: document.body.clientWidth < 992 ? 5 : 7
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  },
  selection: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits()
const currentPage = computed({
  get () {
    return props.page
  },
  set (val) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get () {
    return props.limit
  },
  set (val) {
    emit('update:limit', val)
  }
})
function handleSizeChange (val) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emit('pagination', { page: currentPage.value, limit: val })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
function handleCurrentChange (val) {
  emit('pagination', { page: val, limit: pageSize.value })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}
.tip {
  font-weight: 400;
  color: var(--el-text-color-regular);
  font-size: 14px;
  white-space: nowrap;
}
.tipSmall {
  font-size: 12px;
}
.pagination-container.hidden {
  display: none;
}
</style>
