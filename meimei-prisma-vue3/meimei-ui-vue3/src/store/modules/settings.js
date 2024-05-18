/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-09-18 21:08:47
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 17:23:47
 * @FilePath: \meimei-new-前端\src\store\modules\settings.js
 * @Description: 
 * 
 */
import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import { getWeb } from '@/api/login.js'
const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const useSettingsStore = defineStore(
  'settings',
  {
    state: () => ({
      title: '',
      theme: '#409EFF',
      sideTheme: sideTheme,
      showSettings: showSettings,
      topNav: undefined,
      tagsView: undefined,
      fixedHeader: undefined,
      sidebarLogo: undefined,
      dynamicTitle: undefined
    }),
    actions: {
      // 初始化布局设置
      initSetting() {
        return new Promise((resolve, reject) => {
          getWeb().then(({ data }) => {
            const storageSetting = data || {}
            this.theme = storageSetting.theme || '#409EFF'
            this.sideTheme = storageSetting.sideTheme || sideTheme
            this.showSettings = showSettings
            this.topNav = storageSetting.topNav === undefined ? topNav : storageSetting.topNav
            this.tagsView = storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView
            this.fixedHeader = storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader
            this.sidebarLogo = storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo
            this.dynamicTitle = storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
            resolve()
          }).catch((error) => {
            reject(error)
          })
        })
      },
      // 修改布局设置
      changeSetting(data) {
        const { key, value } = data
        if (Reflect.has(this, key)) {
          this[key] = value
        }
      },
      // 设置网页标题
      setTitle(title) {
        this.title = title
        useDynamicTitle();
      }
    }
  })

export default useSettingsStore
