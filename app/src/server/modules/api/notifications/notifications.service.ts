import { Component } from '@nestjs/common';

interface ConnectedUser {
  clientId: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface NotificationReceiver {
  receiverClientId: string;
  senderUserName: string;
}

@Component()
export class NotificationsServiceComponent {
  connectedUsers = [];

  constructor() {
  }

  addUser(client, connectedUserParameters): void {
    const userParameters = connectedUserParameters;

    userParameters.clientId = client.id;

    this.connectedUsers.push(<ConnectedUser>userParameters);

    console.log('Connected users', this.connectedUsers);
  }

  removeUser(client): void {
    const connectedUsers = this.connectedUsers;
    const connectedUsersLength = this.connectedUsers.length;

    let clientId;

    if (client) {
      clientId = client.id;

      for (let i = 0; i < connectedUsersLength; i += 1) {
        if (connectedUsers[i] && connectedUsers[i].clientId === clientId) {
          connectedUsers.splice(i, 1);
          break;
        }
      }
    }

    console.log(`User ${clientId} disconnected`);
    console.log('Connected users', this.connectedUsers);
  }

  handleNotification(client, userId): NotificationReceiver {
    const senderClientId = client.id;
    const receiverUserId = userId;
    const connectedUsers = this.connectedUsers;
    const connectedUsersLength = this.connectedUsers.length;
    const notificationReceiver = {} as NotificationReceiver;

    for (let i = 0; i < connectedUsersLength; i += 1) {

      if (connectedUsers[i].clientId === senderClientId) {
        notificationReceiver.senderUserName = connectedUsers[i].firstName + ' ' + connectedUsers[i].lastName;
        break;
      }
    }

    for (let i = 0; i < connectedUsersLength; i += 1) {
      if (connectedUsers[i].userId === receiverUserId) {
        notificationReceiver.receiverClientId = connectedUsers[i].clientId;
        break;
      }
    }

    // MultiBrowser test
    // for (let i = 0; i < connectedUsersLength; i += 1) {
    //   if (connectedUsers[i].clientId !== senderClientId) {
    //     notificationReceiver.receiverClientId = connectedUsers[i].clientId;
    //   }
    // }

    return notificationReceiver;
  }

}
