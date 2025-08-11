/*
 * @Author: JiangSheng 87789771@qq.com
 * @Date: 2024-05-20 18:34:10
 * @LastEditors: JiangSheng 87789771@qq.com
 * @LastEditTime: 2024-06-27 10:40:44
 * @FilePath: \meimei-prisma-vue3\meimei-admin\src\modules\common\upload\upload.module.ts
 * @Description:
 *
 */
import { UploadController } from './upload.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as fs from 'fs';
import dayjs from 'dayjs';
import * as multer from 'multer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
const mime = require('mime');
function storage(uploadPath?: string) {
  return multer.diskStorage({
    // 配置上传文件夹
    destination: async function (req, file, cd) {
      const currentDate = dayjs().format('YYYY-MM-DD');
      let path = '';
      if (uploadPath) {
        path = uploadPath + '/' + currentDate;
      } else {
        // 如果没有配置路径 就上传默认路径
        path = join(__dirname, `../../../../static/upload/${currentDate}`);
      }
      try {
        // 判断是否有该文件夹
        await fs.promises.stat(path);
      } catch (error) {
        // 没有该文件夹就创建
        await fs.promises.mkdir(path, { recursive: true });
      }
      // 挂载文件存储的路径
      if (uploadPath) {
        req.query.fileName = '/' + currentDate;
      } else {
        req.query.fileName = '/upload/' + currentDate;
      }
      cd(null, path);
    },
    // 配置上传文件名
    filename: async function (req, file, cd) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      // 重置文件名称
      let originalname = resetName(file);
      // 挂载文件存储的路径
      req.query.fileName =
        req.query.fileName + '/' + uniqueSuffix + '-' + originalname;
      cd(null, uniqueSuffix + '-' + originalname);
    },
  });
}

function resetName(file: Express.Multer.File) {
  const originalname = file.originalname;
  //如果没有文件后缀名
  if (originalname.lastIndexOf('.') < 0) {
    let subtype = mime.getExtension(file.mimetype);
    return originalname + (subtype ? '.' + subtype : '');
  }
  return originalname;
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
  exports: [MulterModule],
})
export class UploadModule {}
