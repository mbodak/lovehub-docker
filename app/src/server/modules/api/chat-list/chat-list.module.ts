import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { chatListProviders } from './chat-list.providers';
import { ChatListController } from './chat-list.controller';
import { ChatListService } from './chat-list.service';
import { UsersProfileModule } from '../users-profile/users-profile.module';

@Module({
  imports: [DatabaseModule, UsersProfileModule],
  controllers: [ChatListController],
  components: [ ChatListService, ...chatListProviders]
})
export class ChatListModule {}
