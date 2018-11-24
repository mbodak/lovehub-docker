import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateMessageDto } from '../../api/chat-messages/dto/create-message.dto';
import { ChatMessagesService } from '../../api/chat-messages/chat-messages.service';
import { NotificationService } from '../notification/notification.service';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway {
  @WebSocketServer() server;

  constructor(
    private messagesService: ChatMessagesService,
    private notifService: NotificationService) {}

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client,data){
    const { chatId }  = JSON.parse(data);

    client.leave(chatId);
  }

  @SubscribeMessage('changeRoom')
  async changeRoom(client, data) {
    const {prevChatId, chat} = JSON.parse(data);

    await this.messagesService.setRead(chat.chatId, chat.user.userId);

    client.leave(prevChatId);
    client.join(chat.chatId);

    this.notifService.sendSetRead(chat.user.userId, chat.chatId);
  }

  @SubscribeMessage('send')
  async getNewMessage(client, data) {
    const {chat, message} = JSON.parse(data);

    const isFriendOnline = await this.server.adapter.rooms[chat.chatId].length;
    message.read = isFriendOnline > 1;

    const dbMessage = await this.messagesService.create(chat.chatId, message as CreateMessageDto);
    client.to(chat.chatId).emit('newMessage', dbMessage);
    this.notifService.sendNotification(chat.user.userId, dbMessage);

    return { event: 'newMessage', data: dbMessage};
  }

  @SubscribeMessage('deleteMessage')
  async deleteMessage(client, data) {
    const parsedData = JSON.parse(data);
    const {chat, msgId} = parsedData;
    const dbRes = await this.messagesService.deleteMessageById(chat.chatId, msgId);
    client.to(chat.chatId).emit('deletedMessageIdFromServer', msgId);
    return { event: 'deletedMessageIdFromServer', data: msgId};
  }

  @SubscribeMessage('editMessage')
  async editMessage(client, data) {
      const parseData = JSON.parse(data);
      const {chat, msgId, text} = parseData;
      const dbRes = await this.messagesService.editMessageText(chat.chatId, msgId, text);
      client.to(chat.chatId).emit('modifiedMessage', {msgId, text});
      return { event: 'modifiedMessage', data: {msgId, text}};
  }
}
