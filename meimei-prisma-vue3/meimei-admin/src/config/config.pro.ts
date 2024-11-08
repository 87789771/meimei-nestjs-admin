/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-22 19:22:42
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-11-08 14:00:00
 * @FilePath: \goods-admin\src\config\config.pro.ts
 * @Description: 开发环境配置文件
 *
 */
export default {
  /**
   * 由于prisma工具的特殊性，每次部署都需要重新生成
   * 新的二进制连接文件，所以数据库的配置放在.env文件里，作为系统环境变量。
   */

  /**
   * 服务启动的端口
   */
  port: process.env.NODE_PORT || 3000,

  /**
   * token加密的密匙
   */
  jwtSecret: '123456',

  /**
   * token过期时间
   * 单位：秒
   * 默认7天
   */
  expiresIn: 60 * 60 * 24 * 7,

  /**
   * reids 配置
   */
  redis: {
    host: process.env.NODE_REDIS_HOST || 'localhost',
    port: process.env.NODE_REDIS_PORT || '6379',
    password: process.env.NODE_REDIS_PASSWORD || '123456',
    db: process.env.NODE_REDIS_DB || 0,
  },

  /**
   * 上传文件的路径
   * 例如： E:/upload   要绝对路径
   * 如果不设置，就是项目根目录下 /static/upload/
   * 项目根目录下/static文件夹默认为静态资源目录
   */
  uploadPath: process.env.NODE_UPLOAD_PATH || '',

  /**
   * 是否演示环境
   */
  isDemoEnvironment: process.env.NODE_UPLOAD_IS_DEMO_ENVIRONMENT === 'true',

  /**
   * 是否启用cors
   * 启用就是后端允许跨域
   */
  cors: false,
};
