/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
@Controller('common')
export class UploadController {
  /* 单文件上传 */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('fileName') fileName,
  ) {
    return {
      fileName,
      originalname: file.originalname,
      mimetype: file.mimetype,
    };
  }

  /* 数组文件上传 */
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFils(@UploadedFiles() files: Array<Express.Multer.File>) {
    /* 暂未处理 */
    return files;
  }
}
