import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { StaticModule } from './modules/static/static.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { MatchingModule } from './modules/matching/matching.module';
import { ChatModule } from './modules/websockets/chat/chat.module';
import { ChatListModule } from './modules/api/chat-list/chat-list.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotificationsModule } from './modules/api/notifications/notifications.module';
import { AdministratorModule } from './modules/api/administrator/administrator.module';
import { PhotosModule } from './modules/api/photos/photos.module';

@Module({
  imports: [
    ApiModule,
    HomepageModule,
    MatchingModule,
    ChatModule,
    ChatListModule,
    AuthModule,
    PhotosModule,
    StaticModule,
    NotificationsModule,
    AdministratorModule,
    StaticModule // Must be the last one !
  ],
  controllers: [],
  components: [],
})
export class ApplicationModule {}
