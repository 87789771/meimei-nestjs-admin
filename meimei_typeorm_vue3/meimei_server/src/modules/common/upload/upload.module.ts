import { UploadController } from './upload.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as moment from 'moment';
import * as multer from 'multer';
import * as MIMEType from 'whatwg-mimetype';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

export function storage(uploadPath) {
  return multer.diskStorage({
    // 配置上传文件夹
    destination: async (req, file, cd) => {
      const currentDate = moment().format('YYYY-MM-DD');
      let path = '';
      if (uploadPath) {
        path = uploadPath + '/' + currentDate;
      } else {
        // 如果没有配置路径 就上传默认路径
        path = join(__dirname, `../../../../public/upload/${currentDate}`);
      }
      try {
        // 判断是否有该文件夹
        await fs.promises.stat(path);
      } catch (error) {
        // 没有该文件夹就创建
        await fs.promises.mkdir(path, { recursive: true });
      }
      // 挂载文件存储的路径
      req.query.fileName = '/upload/' + currentDate;
      cd(null, path);
    },
    // 配置上传文件名
    filename: async (req, file, cd) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      let originalname = file.originalname;
      //如果文件没有后缀就获取文件后缀进行拼接
      if (file.originalname.lastIndexOf('.') < 0) {
        //获取文件后缀
        const mimeType = new MIMEType(file.mimetype);
        const subtype = mimeType.subtype;
        originalname = file.originalname + '.' + subtype;
      }
      // 挂载文件存储的路径
      req.query.fileName =
        req.query.fileName + '/' + uniqueSuffix + '-' + originalname;
      cd(null, uniqueSuffix + '-' + originalname);
    },
  });
}

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          storage: storage(configService.get('uploadPath')),
          preservePath: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadController],
  providers: [MulterModule],
})
export class UploadModule {}
