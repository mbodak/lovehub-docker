import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsServiceComponent } from './notifications.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  components: [NotificationsGateway, NotificationsServiceComponent],
})
export class NotificationsModule {

}
