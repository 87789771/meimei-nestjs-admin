<!--
 * @Author: sheng.jiang 87789771@qq.com
 * @Date: 2023-09-11 10:39:20
 * @LastEditors: sheng.jiang 87789771@qq.com
 * @LastEditTime: 2023-09-11 11:36:02
 * @FilePath: \meimei-nestjs-admin-ui3.0\src\layout\components\AppMain.vue
 * @Description: 
 * 
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component v-if="!route.meta.link" :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
    <iframe-toggle />
  </section>
</template>

<script setup>
import iframeToggle from './IframeToggle/index'
import useTagsViewStore from '@/store/modules/tagsView'

const tagsViewStore = useTagsViewStore()
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;

  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 6px;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #c0c0c0;
}
</style>
