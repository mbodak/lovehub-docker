import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateMessageDto } from '../../api/chat-messages/dto/create-message.dto';
import { ChatMessagesService } from '../../api/chat-messages/chat-messages.service';
import { NotificationService } from './notification.service';

@WebSocketGateway({namespace: 'notification'})
export class NotificationGateway implements OnGatewayDisconnect{
  constructor(private notifService: NotificationService){}

  handleDisconnect(client){
      this.notifService.disconnect(client);
  }

  @SubscribeMessage('notifications')
  setNotifications(client, userId) {
    this.notifService.connect(client, userId);
  }
}
