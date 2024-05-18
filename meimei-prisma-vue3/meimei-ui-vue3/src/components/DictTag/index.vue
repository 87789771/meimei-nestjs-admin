<!--
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-03-11 10:32:26
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-11 16:55:23
 * @FilePath: \耗材前端\src\components\DictTag\index.vue
 * @Description: 
 * 
-->
<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.value)">
        <span
          v-if="item.elTagType == 'default' || item.elTagType == ''"
          :key="item.value"
          :index="index"
          :class="item.elTagClass"
          >{{ item.label + ' ' }}</span
        >
        <el-tag
          v-else
          :disable-transitions="true"
          :key="item.value + ''"
          :index="index"
          :type="item.elTagType"
          :class="item.elTagClass"
          >{{ item.label + ' ' }}</el-tag
        >
      </template>
    </template>
    <template v-if="unmatch && showValue">
      {{ handleArray(unmatchArray) }}
    </template>
  </div>
</template>

<script setup>
// // 记录未匹配的项
const unmatchArray = ref([])

const props = defineProps({
  // 数据
  options: {
    type: Array,
    default: null
  },
  // 当前的值
  value: [Number, String, Array],
  // 当未找到匹配的数据时，显示value
  showValue: {
    type: Boolean,
    default: true
  }
})

const values = computed(() => {
  if (props.value !== null && typeof props.value !== 'undefined') {
    return Array.isArray(props.value) ? props.value : [String(props.value)]
  } else {
    return []
  }
})

const unmatch = computed(() => {
  unmatchArray.value = []
  if (props.value !== null && typeof props.value !== 'undefined') {
    // 传入值为非数组
    if (!Array.isArray(props.value)) {
      if (props.options.some(v => v.value == props.value)) return false
      unmatchArray.value.push(props.value)
      return true
    }
    // 传入值为Array
    props.value.forEach(item => {
      if (!props.options.some(v => v.value == item))
        unmatchArray.value.push(item)
    })
    return true
  }
  // 没有value不显示
  return false
})

function handleArray (array) {
  if (array.length === 0) return ''
  return array.reduce((pre, cur) => {
    return pre + ' ' + cur
  })
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
