import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class NotificationService {
  private socket = io(`${environment.CHAR_URL}/notification`);

  constructor() {}

  connect(userId) {
    this.socket.emit('notifications', userId);
  }

  getNotifications() {
    return new Observable(observer => {
      this.socket.on('notification', (notification) => {
        observer.next(notification);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  setRead() {
    return new Observable(observer => {
      this.socket.on('setRead', (chatId) => {
        observer.next(chatId);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}