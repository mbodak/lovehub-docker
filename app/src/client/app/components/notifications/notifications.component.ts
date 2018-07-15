import { Component, OnInit, OnDestroy } from '@angular/core';

import { NotificationsService } from '../../services/notifications.service';

interface Message {
  user: string;
  isHidden: boolean;
  isShifted: boolean;
}

interface CurrentUser {
  userId: number;
  firstName: string;
  lastName: string;
  role: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: [
    '../administrator/shared/normalize.scss',
    '../administrator/shared/default-styles.scss',
    './notifications.component.scss'
  ]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  notificationsList = {
    isHidden: true,
    minHeight: '0'
  };
  currentUser: CurrentUser = {
    userId: 1234,
    firstName: 'User_1',
    lastName: 'User_1',
    role: 'User'
  };

  constructor(private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.connection = this.notificationsService.getMessages().subscribe(message => {
      this.handleMessages(message);
    });

    // TODO: acquire current logged user parameters with some service and save them to this.currentUser

    this.notificationsService.currentUser = this.currentUser;
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  // Must receive receiver user id somehow
  sendLike(receiverUserId): void {
    // TODO: get receiverUserId from user's profile URL
    this.notificationsService.sendMessage(receiverUserId);
  }

  closeNotificationsList(): void {
    this.messages = [];
    this.notificationsList.isHidden = true;
  }

  handleMessages(message): void {
    const messages = this.messages;
    const randomSequence = (Math.round(Math.random() * 1000000)).toString(); // For testing purposes only, TODO: delete

    let currentMessage = {} as Message;

    messages.push(<Message>{
      user: randomSequence,                           // TODO: change to 'message'
      isHidden: true,
      isShifted: true
    });

    for (let i = 0; i < messages.length; i += 1) {
      if (messages[i]['user'] === randomSequence) {   // TODO: change to 'message'
        currentMessage = messages[i];
        break;
      }
    }

    if (this.notificationsList.isHidden) {
      this.notificationsList.isHidden = false;
    }

    setTimeout(() => {
      currentMessage.isHidden = false;
    }, 500);

    setTimeout(() => {
      currentMessage.isShifted = false;
    }, 1000);

    setTimeout(() => {
      currentMessage.isShifted = true;
    }, 3500);

    setTimeout(() => {
      currentMessage.isHidden = true;
    }, 4000);

    setTimeout(() => {
      messages.splice(messages.indexOf(currentMessage), 1);

      if (messages.length === 0) {
        this.notificationsList.isHidden = true;
      }
    }, 4500);
  }

}
