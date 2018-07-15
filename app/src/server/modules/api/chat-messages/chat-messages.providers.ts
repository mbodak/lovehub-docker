import { Connection } from 'mongoose';
import { ChatSchema } from './schemas/chat.schema';

export const chatMessagesProviders = [
  {
    provide: 'ChatModelToken',
    useFactory: (connection: Connection) => connection.model('Chat', ChatSchema),
    inject: ['MongodbConnectionToken'],
  },
];
