<script setup>
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'

onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme)
  })
})
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}


body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
