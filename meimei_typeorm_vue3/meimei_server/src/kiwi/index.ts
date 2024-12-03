import Decimal from 'decimal.js'
import axios from 'axios'
import { CronTime } from 'cron'

Decimal.set({ toExpNeg: -100, toExpPos: 100 })

export const toDecimal = (val) => {
  return new Decimal(val)
}

export { Decimal, axios }

// Env
export const env = {
  serverPort: parseInt(process.env.SERVER_PORT || '3456', 10),
  isDemoEnv: process.env.IS_DEMO_ENV === 'true',
  uploadPath: process.env.UPLOAD_PATH,
  apiGlobalPrefix: process.env.API_GLOBAL_PREFIX,
  isOpenDoc: process.env.IS_OPEN_DOC === 'true',
  appEnv: process.env.APP_ENV,

  dbType: process.env.DB_TYPE || 'mysql',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT || '3306', 10),
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  dbDatabase: process.env.DB_DATABASE || 'default_db_name',
  dbSynchronize: process.env.DB_SYNCHRONIZE === 'true',
  dbLogging: process.env.DB_LOGGING === 'true',

  isUsingRedis: process.env.IS_USING_REDIS === 'true',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
  redisDb: process.env.REDIS_DB || '0',
  redisPassword: process.env.REDIS_PASSWORD || '',
}

// Tools
export const tool = {
  isValidCron: (expression) => {
    try {
      new CronTime(expression)
      return true
    } catch (e) {
      return false
    }
  },
}
