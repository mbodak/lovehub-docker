import { Component, OnInit, OnDestroy } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../services/auth.service';

interface Message {
  user: string;
  isHidden: boolean;
  isShifted: boolean;
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
  public connection;
  public messages = [];
  public notificationsList = {
    isHidden: true,
    minHeight: '0'
  };
  public currentUser = {} as any;

  constructor(private notificationsService: NotificationsService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.connection = this.notificationsService.getMessages().subscribe(message => {
      if (message) {
        this.handleMessages(message);
      }
    });

    this.authService.isUserLoggedIn.subscribe(data => {
      if (data) {
        this.currentUser = jwt_decode(localStorage.getItem('jwt_token'));
        this.notificationsService.sendOnlineUser(this.currentUser);
      } else {
        this.notificationsService.disconnectUser();
      }
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  // TODO: attach to some button to test 'Like' notifications
  sendLike(receiverUserId): void {
    // TODO: get 'like' receiver user id
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
