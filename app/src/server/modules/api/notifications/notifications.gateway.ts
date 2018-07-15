import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException
} from '@nestjs/websockets';

import { NotificationsServiceComponent } from './notifications.service';

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(private readonly notificationsService: NotificationsServiceComponent) {
  }

  handleConnection(client: any) {
    console.log(`User ${client.id} connected via websocket`);
    client.emit('connection-successful');
  }

  handleDisconnect(client: any) {
    console.log(`User ${client.id} disconnected`);
    this.notificationsService.removeUser(client);
  }

  // Received data must contain user properties:
  // user id, first name, last name and optionally type of message: 'like', new mail, chat message, etc.
  @SubscribeMessage('user-parameters')
  onConnect(client, connectedUserParameters) {
    this.notificationsService.addUser(client, connectedUserParameters);
  }

  // Remove disconnected user from connected users array
  @SubscribeMessage('user-disconnected')
  onDisconect(client) {
    console.log(`User ${client.id} disconnected`);
    this.notificationsService.removeUser(client);
  }

  // Received data must contain link to user-receiver profile (user id)
  // Sent data must contain sender name and optionally message context: 'like', new mail, chat message, etc.
  @SubscribeMessage('send-notification')
  onNotification(client, receiverUserId) {
    const notificationReceiver = this.notificationsService.handleNotification(client, receiverUserId);

    if (notificationReceiver.receiverClientId) {
      this.server.sockets
        .to(notificationReceiver.receiverClientId)
        .emit('receive-notification', notificationReceiver.senderUserName);
    }

    // console.log(this.server.sockets.sockets);
    // console.log(this.server.sockets.connected);
  }

}
