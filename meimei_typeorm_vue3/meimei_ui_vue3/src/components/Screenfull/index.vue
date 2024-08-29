<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" />
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>

<style lang="scss" scoped>
.screenfull-svg {
  display: inline-block;
  width: 20px;
  height: 20px;
  fill: #5a5e66;
  vertical-align: 10px;
  cursor: pointer;
}
</style>
