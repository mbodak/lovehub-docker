import { Connection } from 'mongoose';
import { PhotoSchema } from './schemas/photo.schema';

export const photosProviders = [
  {
    provide: 'PhotoModelToken',
    useFactory: (connection: Connection) => connection.model('Photo', PhotoSchema, 'Photo'),
    inject: ['MongodbConnectionToken'],
  },
];
