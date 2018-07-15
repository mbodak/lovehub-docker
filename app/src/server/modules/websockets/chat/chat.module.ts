import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongodbModule } from '../../api/mongodb/mongodb.module';
import { ChatMessagesModule } from '../../api/chat-messages/chat-messages.module';

@Module({
  imports: [MongodbModule, ChatMessagesModule],
  controllers: [ ],
  components: [ ChatGateway]
})
export class ChatModule {}
