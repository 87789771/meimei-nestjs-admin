import { UploadController } from './upload.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import * as moment from 'moment'
import * as multer from 'multer';


export let storage = multer.diskStorage({
    // 配置上传文件夹
    destination: async (req, file, cd) => {
        let currentDate = moment().format('YYYY-MM-DD')
        let path = join(__dirname, `../../../../public/upload/${currentDate}`)
        try {
            // 判断是否有该文件夹
            await fs.promises.stat(path)
        } catch (error) {
            // 没有该文件夹就创建
            await fs.promises.mkdir(path, { recursive: true })
        }
        // 挂载文件存储的路径
        req.query.fileName = '/upload/' + currentDate
        cd(null, path)
    },
    // 配置上传文件名
    filename: (req, file, cd) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // 挂载文件存储的路径
        req.query.fileName = req.query.fileName + '/' + uniqueSuffix + '-' + file.originalname
        cd(null, uniqueSuffix + '-' + file.originalname)
    }
})

@Module({
    imports: [MulterModule.register({
        storage: storage,
        preservePath: false,
    })],
    controllers: [
        UploadController,],
    providers: [MulterModule],
})
export class UploadModule { }
