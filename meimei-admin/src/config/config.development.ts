/*
 * @Author: Sheng.Jiang
 * @Date: 2021-09-03 11:32:52
 * @LastEditTime: 2022-09-14 17:23:01
 * @LastEditors: Please set LastEditors
 * @Description: 测试环境配置文件
 * @FilePath: \meimei-admin\src\config\config.development.ts
 * You can you up，no can no bb！！
 */
import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  // typeorm 配置
  database: {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '42.192.136.154',
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME || 'mei-mei-dev',
    password: process.env.MYSQL_PASSWORD || 'y3xxKRAmamMGTk3s',
    database: process.env.MYSQL_DATABASE || 'mei-mei-dev',
    autoLoadModels: true,
    synchronize: true,
    logging: false,
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

  //文件上传地址
  uploadPath: 'E:/upload/test',

  // 是否演示环境
  isDemoEnvironment: false,
});
