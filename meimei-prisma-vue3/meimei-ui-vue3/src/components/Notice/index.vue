<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-03-12 11:17:10
 * @LastEditors: jiangSheng 87789771@qq.com
 * @LastEditTime: 2024-03-12 15:52:46
 * @FilePath: \耗材前端\src\components\Notice\index.vue
 * @Description: 
 * 
-->
<script setup>
import { ref } from 'vue'
import { noticesData } from './data.js'
import NoticeList from './noticeList.vue'

const noticesNum = ref(0)
const notices = ref(noticesData)
const activeKey = ref(noticesData[0].key)

notices.value.map(v => (noticesNum.value += v.list.length))
const load = () => {
  console.log('触底了')
}
</script>

<template>
  <el-dropdown trigger="click" placement="bottom-end">
    <span class="dropdown-badge navbar-bg-hover select-none">
      <el-badge :value="noticesNum" :max="99">
        <svg-icon icon-class="bell" />
      </el-badge>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-tabs
          v-model="activeKey"
          :stretch="true"
          class="dropdown-tabs"
          :style="{ width: notices.length === 0 ? '200px' : '330px' }"
        >
          <el-empty
            v-if="notices.length === 0"
            description="暂无消息"
            :image-size="60"
          />
          <span v-else>
            <template v-for="item in notices" :key="item.key">
              <el-tab-pane
                :label="`${item.name}(${item.list.length})`"
                :name="`${item.key}`"
              >
                <el-scrollbar max-height="330px">
                  <div class="noticeList-container">
                    <NoticeList :list="item.list" />
                  </div>
                </el-scrollbar>
                <el-popconfirm :title="`是否确认将所有未读${item.name}标记为已读?`" :teleported="false">
                  <template #reference>
                    <el-button
                      link
                      type="primary"
                      size="small"
                      style="margin-left: 20px; margin-top: 7px"
                      >全部标记为已读</el-button
                    >
                  </template>
                </el-popconfirm>
              </el-tab-pane>
            </template>
          </span>
        </el-tabs>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.dropdown-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  cursor: pointer;
  padding-right: 15px;
  .header-notice-icon {
    font-size: 18px;
  }
}

.dropdown-tabs {
  .noticeList-container {
    padding: 15px 24px 0;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__nav-wrap)::after {
    height: 1px;
  }

  :deep(.el-tabs__nav-wrap) {
    padding: 0 36px;
  }
}
</style>
