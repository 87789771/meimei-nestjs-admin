import request from '@/utils/request'

// 查询导航分类列表
export const listNavCategory = (params) => request({ url: '/nav/categories', method: 'GET', params })
// 添加导航分类列表
export const addNavCategory = (data) => request({ url: '/nav/categories', method: 'POST', data })
// 查询导航分类详细
export const getNavCategory = (id) => request({ url: `/nav/categories/${id}`, method: 'GET' })
// 修改导航分类
export const updateNavCategory = (id, data) => request({ url: `/nav/categories/${id}`, method: 'PUT', data })
// 删除导航分类
export const delNavCategory = (data) => request({ url: `/nav/categories`, method: 'DELETE', data })

// 分页查询导航分类下的网站列表
export const listNavCategoryWebsites = (categoryId, params) =>
  request({ url: `/nav/categories/${categoryId}/websites/paging`, method: 'GET', params })
// 添加网站
export const addWebsite = (data) => request({ url: '/nav/websites', method: 'POST', data })
// 查询网站详细
export const getWebsite = (id) => request({ url: `/nav/websites/${id}`, method: 'GET' })
// 修改网站
export const updateWebsite = (id, data) =>
  request({
    url: `/nav/websites/${id}`,
    method: 'PUT',
    data,
  })
// 删除网站
export const delWebsite = (data) => request({ url: `/nav/websites`, method: 'DELETE', data })

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'get',
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/system/dict/type',
    method: 'post',
    data: data,
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: '/system/dict/type',
    method: 'put',
    data: data,
  })
}

// 删除字典类型
export function delType(dictId) {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'delete',
  })
}

// 刷新字典缓存
export function refreshCache() {
  return request({
    url: '/system/dict/type/refreshCache',
    method: 'delete',
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get',
  })
}
