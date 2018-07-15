import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { chatMessagesProviders } from './chat-messages.providers';
import { ChatMessagesController } from './chat-messages.controller';
import { ChatMessagesService } from './chat-messages.service';
import { UsersProfileModule } from '../users-profile/users-profile.module';

@Module({
  imports: [DatabaseModule, UsersProfileModule],
  controllers: [ChatMessagesController],
  components: [ ChatMessagesService, ...chatMessagesProviders],
  exports: [ChatMessagesService]
})
export class ChatMessagesModule {}
