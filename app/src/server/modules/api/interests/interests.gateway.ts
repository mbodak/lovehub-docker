import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer
} from '@nestjs/websockets';

import { InterestsServiceComponent } from './interests.service';

@WebSocketGateway({ namespace: 'interests' })
export class InterestsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(private readonly interestsService: InterestsServiceComponent) {
  }

  handleConnection(client: any) {
    console.log(`User ${client.id} connected via websocket`);
    client.emit('connection-successful');
  }

  handleDisconnect(client: any) {
    this.interestsService.removeConnectedUser(client);
  }

  @SubscribeMessage('user-id')
  onConnect(client: any, userId) {
    this.interestsService.addConnectedUser(client, userId);
  }

  @SubscribeMessage('user-disconnected')
  onDisconect(client: any) {
    this.interestsService.removeConnectedUser(client);
  }

  @SubscribeMessage('get-user-interests')
  getInterests(client: any, profileOwnerId) {
    this.interestsService.getInterests(profileOwnerId).then(interests => {
      client.emit('receive-interests', interests);
    });
  }

  @SubscribeMessage('send-user-input')
  getHints(client: any, userInput) {
    this.interestsService.createHints(userInput).then(hints => {
      client.emit('receive-hints', hints);
    });
  }

  @SubscribeMessage('change-user-interests')
  changeInterests(client: any, interests) {
    this.interestsService.changeInterests(client, interests);
  }

}
