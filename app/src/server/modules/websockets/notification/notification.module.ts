import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { MongodbModule } from '../../api/mongodb/mongodb.module';
import { ChatMessagesModule } from '../../api/chat-messages/chat-messages.module';
import { ChatListModule } from '../../api/chat-list/chat-list.module';
import { NotificationService } from './notification.service';


@Module({
  imports: [MongodbModule, ChatMessagesModule, ChatListModule],
  controllers: [ ],
  components: [ NotificationGateway, NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
