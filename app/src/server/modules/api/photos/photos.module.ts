import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { photosProviders } from './photos.providers';
import { MongodbModule } from '../mongodb/mongodb.module';

@Module({
  imports: [ MongodbModule ],
  controllers: [ PhotosController ],
  components: [
    PhotosService, ...photosProviders,
  ],
  exports: [
    PhotosService
  ]
})
export class PhotosModule {}
