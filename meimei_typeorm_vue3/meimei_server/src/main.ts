import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import * as kleur from 'kleur'
// import * as history from 'connect-history-api-fallback'
import helmet from 'helmet'
import * as dotenv from 'dotenv'

const { NODE_ENV } = process.env
const envFile = `.env${NODE_ENV ? `.${NODE_ENV}` : ''}`
dotenv.config({ path: envFile })

import * as kiwi from 'src/kiwi'
import { getLocalIpAddresses } from 'src/common/utils'
import { AppModule } from './app.module'

async function bootstrap() {
  // 运行端口

  const port = kiwi.env.serverPort
  // Api 前缀
  const globalPrefix = kiwi.env.apiGlobalPrefix
  // 本机 ipv4 地址
  const localIpAddresses = getLocalIpAddresses()

  // 应用程序实例
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })
  // 设置全局请求前缀
  app.setGlobalPrefix(globalPrefix)
  /* 设置 HTTP 标头来帮助保护应用免受一些众所周知的 Web 漏洞的影响 */
  app.use(
    helmet({
      contentSecurityPolicy: false, // 取消https强制转换
    }),
  )

  /* 启动 vue 的 history模式 */
  // app.use(
  //   history({
  //     rewrites: [
  //       {
  //         from: /^\/swagger-ui\/.*$/,
  //         to: function (context) {
  //           return context.parsedUrl.pathname
  //         },
  //       },
  //     ],
  //   }),
  // )

  /* 配置静态资源目录 */
  app.useStaticAssets(join(__dirname, '../public'))
  /* 配置上传文件目录为 资源目录 */
  if (kiwi.env.uploadPath) {
    app.useStaticAssets(kiwi.env.uploadPath, {
      prefix: '/upload',
    })
  }

  // 文档提示
  let docTips = ''
  if (kiwi.env.isOpenDoc) {
    const options = new DocumentBuilder()
      .setTitle('Origin server')
      .setDescription('Origin server swagger ui')
      .setVersion('1.0')
      .setTermsOfService('https://docs.nestjs.cn/8/introduction')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('swagger-ui', app, document)

    docTips = `Docs running at:
     - Local:   ${kleur.green(`http://localhost:${port}/swagger-ui/`)}
     - Network: ${kleur.green(`http://${localIpAddresses[0]}:${port}/swagger-ui/`)}`
  }
  // 启动信息
  const runningInfo = `
     App running at:
     - APP_ENV:  ${kleur.green(kiwi.env.appEnv || '')}
     - Locale:  ${kleur.green(new Date().toString())}
     - Local:   ${kleur.green(`http://localhost:${port}${globalPrefix}/`)}
     - Network: ${kleur.green(`http://${localIpAddresses[0]}:${port}${globalPrefix}/`)}
     ${docTips}
     `

  // 启动服务
  await app.listen(port, '0.0.0.0', () => {
    console.log(runningInfo)
  })
}

bootstrap()
