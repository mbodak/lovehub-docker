import * as mongoose from 'mongoose';
import { config } from '../../../config/config';

const { host, port, db } = config.mongo;
const connectionString = `mongodb://${host}:${port}/${db}`;

export const mongodbProviders = [
  {
    provide: 'MongodbConnectionToken',
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(connectionString);
    },
  },
];
