import { Connection } from 'mongoose';
import { UserProfileSchema } from './user-profile.schema';

export const UserProfileProvider = [
  {
    provide: 'UsersProfileModelToken',
    useFactory: (connection: Connection) => connection.model('UserProfile', UserProfileSchema, 'User'),
    inject: ['MongodbConnectionToken'],
  },
];
