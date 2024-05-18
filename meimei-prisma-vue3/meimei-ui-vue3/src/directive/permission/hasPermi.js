/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-09-18 21:08:47
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2023-10-04 23:26:06
 * @FilePath: /耗材物流前端/src/directive/permission/hasPermi.js
 * @Description: 自定义权限指令
 * 
 */
 /**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2019 mei-mei
 */
 
import useUserStore from '@/store/modules/user'

export default {
  mounted(el, binding, vnode) {
    const { value } = binding
    const all_permission = "*:*:*";
    const permissions = useUserStore().permissions

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
