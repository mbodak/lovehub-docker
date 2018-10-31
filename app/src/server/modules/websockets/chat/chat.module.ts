import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongodbModule } from '../../api/mongodb/mongodb.module';
import { NotificationModule } from '../notification/notification.module';
import { ChatMessagesModule } from '../../api/chat-messages/chat-messages.module';

@Module({
  imports: [MongodbModule, ChatMessagesModule, NotificationModule],
  controllers: [],
  components: [ ChatGateway]
})
export class ChatModule {}
