import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { fileName, fileFilter } from './helpers';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';



@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService, private readonly configService: ConfigService) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string){

    const path = this.filesService.getFindProductImage(imageName);

    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    //limits: {fileSize: 1000000},
    storage:diskStorage({
      destination: './static/products',
      filename: fileName,
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    
    console.log({file});
    //const fileExtension =file.mimetype.split('/')[1];
    //const secureUrl = `${process.env.HOSTNAME}/products/${file.filename}`;
    const secureUrl = `${this.configService.get('HOST_API')}files/product/${file.filename}`;

    if (!file) throw new BadRequestException( `Files with the extension are not allowed.`);
    return {secureUrl};
  }
}
