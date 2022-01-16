/*
 * @Author: Sheng.Jiang
 * @Date: 2021-09-03 11:32:52
 * @LastEditTime: 2022-01-16 14:18:32
 * @LastEditors: Sheng.Jiang
 * @Description: 正式环境配置文件
 * @FilePath: \meimei-admin\src\config\config.production.ts
 * You can you up，no can no bb！！
 */
import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  // typeorm config
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
  // redis cache config
  redis: {
    config: {
      url: 'redis://localhost:6379/0'
    }
  },

  bullRedis: {
    host: 'localhost',
    port: '6379'
  },

  isDemoEnvironment: true,
});
