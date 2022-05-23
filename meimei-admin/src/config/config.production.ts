/*
 * @Author: Sheng.Jiang
 * @Date: 2021-09-03 11:32:52
 * @LastEditTime: 2022-05-23 09:20:26
 * @LastEditors: Please set LastEditors
 * @Description: 正式环境配置文件
 * @FilePath: \meimei-admin\src\config\config.production.ts
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
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || 'admin',
    database: process.env.MYSQL_DATABASE || 'mei-mei',
    autoLoadModels: true,
    synchronize: true,
    logging: false,
  },
  // redis 配置
  redis: {
    config: {
      url: 'redis://:123456@localhost:6379/0'
    }
  },

  // 队列reids 配置
  bullRedis: {
    host: 'localhost',
    port: '6379',
    password: '123456'
  },

  isDemoEnvironment: false,
});
