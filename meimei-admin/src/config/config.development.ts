/*
 * @Author: Sheng.Jiang
 * @Date: 2021-09-03 11:32:52
 * @LastEditTime: 2022-09-26 23:15:35
 * @LastEditors: Please set LastEditors
 * @Description: 测试环境配置文件
 * @FilePath: /meimei-admin/src/config/config.development.ts
 * You can you up，no can no bb！！
 */
import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  // typeorm 配置
  database: {
    type: 'mysql', //数据库类型
    host: process.env.MYSQL_HOST || '42.192.136.154', //数据库地址
    port: process.env.MYSQL_PORT || 3306, //数据库端口
    username: process.env.MYSQL_USERNAME || 'mei-mei-dev', //数据库账号
    password: process.env.MYSQL_PASSWORD || 'y3xxKRAmamMGTk3s', //数据库密码
    database: process.env.MYSQL_DATABASE || 'mei-mei-dev', //数据库名称
    autoLoadModels: true, //模型自动加载，无需在在配置处重复写实体。
    synchronize: true, //如果为true 自动加载的模型将被同步进数据库，生产环境要关闭，否则可能因为字段的删除而造成数据的丢失。
    logging: false, //是否启动日志记录
  },
  // redis 配置
  redis: {
    config: {
      url: 'redis://:123456@localhost:6379/0',
    },
  },

  // 队列reids 配置
  bullRedis: {
    host: 'localhost',
    port: '6379',
    password: '123456',
  },

  //文件上传地址  例如： E:/upload/test
  uploadPath: '',

  // 是否演示环境
  isDemoEnvironment: false,
});
