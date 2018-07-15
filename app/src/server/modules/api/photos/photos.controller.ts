import { Controller, Get, Post, Delete, Body, Param, HttpCode, Request, Response, HttpStatus, Headers } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './interfaces/photo.interface';


@Controller('api')
export class PhotosController {

  constructor(private readonly photosService: PhotosService) {
  }

  @HttpCode(201)
  @Post('/avatars/users/:id')
  async createAva(@Request() req, @Response() res, @Body('data') file, @Param() params): Promise<any> {
    const img = await this.photosService
      .create({name: file.name, base64: file.base64, avatar: true, userId: params.id} as CreatePhotoDto);
    console.log(img._id);
    res.status(HttpStatus.OK).json({data: 'success'});
  }

  @HttpCode(201)
  @Post('/photos/users/:id')
  async create(@Request() req, @Response() res, @Body('data') file, @Param() params): Promise<any> {
    const img = await this.photosService
      .create({name: file.name, base64: file.base64, avatar: false, userId: params.id} as CreatePhotoDto);
    console.log(img._id);
    res.status(HttpStatus.OK).json({data: 'success'});
  }

  @HttpCode(200)
  @Get('/photos/:photoId')
  async findById(@Param() params): Promise<Photo> {
    if (params.photoId) {
      return await this.photosService.findByPhotoId(params.photoId);
    } else {
      console.log('There is no photoId');
    }
  }

  @HttpCode(200)
  @Get('/photos/users/:userId')
  async findAllByUserId(@Param() params): Promise<Photo[]> {
    if (params.userId) {
      return await this.photosService.findAllByUserId(params.userId);
    } else {
      console.log('There is no userId');
    }
  }

  @HttpCode(200)
  @Get('/photos/users/:userId/avatar')
  async findAvatarByUserId(@Param() params): Promise<Photo> {
    if (params.userId) {
      return await this.photosService.findAvatarByUserId(params.userId);
    } else {
      console.log('There is no userId');
    }
  }

  @HttpCode(204)
  @Delete('/photos/:photoId')
  async removePhoto(@Param() params): Promise<{statusCode: number}> {
    if (params.photoId) {
      const affected = await this.photosService.remove(params.photoId);
      return {statusCode: affected};
    } else {
      console.log('There is no photoId');
    }
  }

}
