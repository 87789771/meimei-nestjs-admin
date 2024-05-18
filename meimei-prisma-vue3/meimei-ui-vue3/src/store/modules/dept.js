/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-01-14 10:51:40
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-01-14 16:45:45
 * @FilePath: /耗材前端/src/store/modules/dept.js
 * @Description: 系统内的部门 下拉列表选项
 * 
 */
import { defineStore } from "pinia";
import { deptList } from '@/api/system/dept.js'

const userDeptStore = defineStore(
    'dept',
    {
        state: () => ({
            // 只有启用的部分
            hospitalList: [], // 医院(权限范围)
            warehouse1: [],// 一级库(权限范围)
            warehouse2: [],// 二级库(权限范围)
            levelWarehouse1: [], // 同父级的所有一级库
            levelWarehouse2: [], // 同父级的所有二级库
            supplierList: [], // 供应商列表(权限范围)
            // 下面都是包括停用的组织（启用和停用都在里面）
            hospitalList_1: [], // 医院(权限范围)
            warehouse1_1: [],// 一级库(权限范围)
            warehouse2_1: [],// 二级库(权限范围)
            levelWarehouse1_1: [], // 同父级的所有一级库
            levelWarehouse2_1: [], // 同父级的所有二级库
            supplierList_1: [], // 供应商列表(权限范围)
        }),
        actions: {
            // status  1查所有  0只启用 
            getDept(_key, status) {
                return new Promise((resolve, reject) => {
                    if (Reflect.has(this, _key)) {
                        if (this[_key].length) {
                            resolve(this[_key])
                        } else {
                            //请求值后返回
                            deptList({ deptType: _key, status })
                                .then(({ data }) => {
                                    data.forEach((item) => {
                                        item.all = item.deptId + item.deptName + item.mnemonicCode
                                    })
                                    if (status === '0') {
                                        this[_key] = data
                                    } else if (status === '1') {
                                        this[_key + '_1'] = data
                                    }
                                    resolve(this[_key])
                                })
                        }
                    } else {
                        reject('组织下拉type传参错误')
                    }
                })
            }
        }
    }
)
export default userDeptStore