import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateMessageDto } from '../../api/chat-messages/dto/create-message.dto';
import { ChatMessagesService } from '../../api/chat-messages/chat-messages.service';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway{

  constructor(private messagesService: ChatMessagesService){}

  @SubscribeMessage('changeRoom')
  changeRoom(client, data) {
    const chat = JSON.parse(data);

    client.leave(chat.prevChatId);
    client.join(chat.chatId);
  }

  @SubscribeMessage('send')
  getNewMessage(client, data) {
    const parsedData = JSON.parse(data);
    const res = parsedData.data;

    this.messagesService.create(res.chatId, res.message as CreateMessageDto);

    client.to(parsedData.chatId).emit('resFromServer', res.message);
    
    return { event: 'resFromServer', data: res.message};
  }
}
