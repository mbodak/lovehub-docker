import { Module } from '@nestjs/common';
import { mongodbProviders } from './mongodb.providers';

@Module({
  components: [...mongodbProviders],
  exports: [...mongodbProviders],
})
export class MongodbModule {}
