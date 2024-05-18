/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-01-06 15:24:29
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 15:48:58
 * @FilePath: \meimei-new-前端\src\api\login.js
 * @Description: 登录过程中加载的东西
 * 
 */
import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 获取用户的界面配置信息
export function getWeb() {
  return request({
    url: '/system/web',
    method: 'get'
  })
}

// 添加用户的界面配置信息
export function addWeb(data) {
  return request({
    url: '/system/web',
    method: 'post',
    data
  })
}

// 删除用户的界面配置信息
export function deleteWeb() {
  return request({
    url: '/system/web',
    method: 'delete'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}