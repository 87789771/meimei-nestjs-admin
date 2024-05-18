/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-01-06 15:24:29
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-01-14 16:13:01
 * @FilePath: /耗材前端/src/api/system/dept.js
 * @Description: 组织架构接口
 * 
 */
import request from '@/utils/request'

// 查询部门列表
export function listDept(query) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/system/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/system/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'delete'
  })
}

// 查询不同类型的部门
export function deptList(params) {
  return request({
    url: '/system/dept/listDept',
    method: 'get',
    params
  })
}