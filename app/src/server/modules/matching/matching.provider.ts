import { Connection } from 'mongoose';
import { Matching } from './matching.schema';

export const Match = [
  {
    provide: 'MatchingModelToken',
    useFactory: (connection: Connection) => connection.model('Matching', Matching),
    inject: ['MongodbConnectionToken'],
  },
];
