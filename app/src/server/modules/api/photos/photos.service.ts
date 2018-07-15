import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { Photo } from './interfaces/photo.interface';
import { CreatePhotoDto } from './dto/create-photo.dto';


@Component()
export class PhotosService {
  constructor(
    @Inject('PhotoModelToken') private readonly photoModel: Model<Photo>) {}

  async create({name, base64, avatar, userId}): Promise<Photo> {
    const createdPhoto = new this.photoModel({
      name: name,
      base64: base64,
      avatar: avatar,
      userId: userId,
      time: Date.now()
    });
    return await createdPhoto.save();
  }

  async findAllByUserId(userId: number): Promise<Photo[]> {
    console.log(userId);
    return this.photoModel.find({ 'userId': userId, 'avatar': false }).sort({time: -1})
      .then(arr => {
        arr.map(photo => console.log(photo['time']));
        return arr;
      });
  }

  async findAvatarByUserId(userId: number): Promise<Photo> {
    console.log(userId);
    return this.photoModel.findOne({ 'userId': userId, 'avatar': true }).sort({time: -1});
  }

  async findByPhotoId(photoId: string): Promise<Photo> {
    try {
      if (photoId.match(/^[0-9a-fA-F]{24}$/)) {
        return await this.photoModel.findById(photoId);
      }
    } catch (error) {
      console.error(`Arise an exception in the findById(${photoId}) method Photos Service`);
      throw error;
    }
  }

  async remove(photoId: string): Promise<number> {
    return await this.photoModel.deleteOne({ '_id': photoId });
  }
}
