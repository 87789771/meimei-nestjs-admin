/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-24 21:57:34
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-17 20:11:34
 * @FilePath: /meimei-new/src/common/contants/redis.contant.ts
 * @Description: reids缓存信息的key前缀
 */
/* 图片key */
export const CAPTCHA_IMG_KEY = 'captcha:img';

/* 用户信息 */
export const USER_VERSION_KEY = 'admin:user:version'; // 存储版本号
export const USER_TOKEN_KEY = 'admin:user:token'; // 用户token
export const USER_INFO_KEY = 'admin:user:userinfo'; // 用户信息

/* 在线用户 */
export const USER_ONLINE_KEY = 'admin:online:user'; // 在线用户

/* 系统参数 */
export const SYSCONFIG_KEY = 'sys:sysConfig';

/* 系统字典 */
export const DICTTYPE_KEY = 'sys:dictType';

/* 用户页面配置 */
export const WEB_CONFIG_KEY = 'sys:webConfig';

/* 用户表格配置 */
export const TABLE_CONFIG_KEY = 'sys:tableConfig';

export const cacheList = [
  {
    cacheName: CAPTCHA_IMG_KEY,
    remark: '验证码',
  },
  {
    cacheName: USER_VERSION_KEY,
    remark: 'Token版本号',
  },
  {
    cacheName: USER_TOKEN_KEY,
    remark: '用户Token',
  },
  {
    cacheName: USER_INFO_KEY,
    remark: '用户信息',
  },
  {
    cacheName: USER_ONLINE_KEY,
    remark: '在线用户',
  },
  {
    cacheName: SYSCONFIG_KEY,
    remark: '系统参数',
  },
  {
    cacheName: DICTTYPE_KEY,
    remark: '系统字典',
  },
  {
    cacheName: WEB_CONFIG_KEY,
    remark: '用户页面配置',
  },
  {
    cacheName: TABLE_CONFIG_KEY,
    remark: '用户表格配置',
  },
];
