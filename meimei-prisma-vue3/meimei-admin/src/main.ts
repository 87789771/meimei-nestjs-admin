/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2024-04-20 17:42:55
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-05-19 01:36:57
 * @FilePath: /meimei-admin/src/main.ts
 * @Description: 主入口
 *
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  /* 设置后，如果服务经过代理 req.ips 将是一个[]。可以获得真实ip  */
  app.set('trust proxy', true);

  /* 读取环境变量里是否允许跨域 */
  const cors = configService.get('cors');
  if (cors) {
    app.enableCors();
  }

  /* 设置 HTTP 标头来帮助保护应用免受一些众所周知的 Web 漏洞的影响 */
  app.use(
    helmet({
      contentSecurityPolicy: false, //取消https强制转换
    }),
  );

  /* 设置静态资源目录 */
  app.useStaticAssets(join(__dirname, '../static'));

  /* 读取配置文件是否有配置的上传文件目录，也设置为静态资源目录,方便前端加载 */
  const uploadPath = configService.get('uploadPath');
  if (uploadPath) {
    app.useStaticAssets(uploadPath);
  }

  /* 读取环境变量里的项目启动端口 */
  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
