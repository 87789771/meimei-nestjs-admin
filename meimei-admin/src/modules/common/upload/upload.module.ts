import { UploadController } from './upload.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import * as moment from 'moment';
import * as multer from 'multer';
import * as MIMEType from 'whatwg-mimetype';

export const storage = multer.diskStorage({
  // 配置上传文件夹
  destination: async (req, file, cd) => {
    const currentDate = moment().format('YYYY-MM-DD');
    const path = join(__dirname, `../../../../public/upload/${currentDate}`);
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
  filename: (req, file, cd) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const mimeType = new MIMEType(file.mimetype);
    //获取文件后缀
    const subtype = mimeType.subtype;
    // 拼接完整文件名
    let originalname = '';
    const lastIndex = file.originalname.lastIndexOf('.');
    if (lastIndex >= 0) {
      originalname = file.originalname.substring(0, lastIndex) + '.' + subtype;
    } else {
      originalname = file.originalname + '.' + subtype;
    }
    // 挂载文件存储的路径
    req.query.fileName =
      req.query.fileName + '/' + uniqueSuffix + '-' + originalname;
    cd(null, uniqueSuffix + '-' + originalname);
  },
});

@Module({
  imports: [
    MulterModule.register({
      storage: storage,
      preservePath: false,
    }),
  ],
  controllers: [UploadController],
  providers: [MulterModule],
})
export class UploadModule {}
