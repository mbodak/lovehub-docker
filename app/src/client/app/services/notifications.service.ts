import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

interface CurrentUser {
  userId: number;
  firstName: string;
  lastName: string;
  role: string;
}

@Injectable()
export class NotificationsService {
  private serverURL = 'http://localhost:5400';  // TODO: change on server's url change
  private socket = io(this.serverURL);          // TODO: add namespace to URL for notifications WS connection

  public currentUser = {} as CurrentUser;

  constructor() {
  }

  sendMessage(receiverUserId) {
    this.socket.emit('send-notification', receiverUserId);
  }

  getMessages() {
    return new Observable(observer => {
      this.socket.on('connect', () => {
        this.socket.emit('user-parameters', this.currentUser);
      });

      this.socket.on('connection-successful', () => {
        console.log('Connected to server via websocket');
      });

      this.socket.on('receive-notification', (data) => {
        observer.next(data);
      });

      this.socket.on('disconnect', () => {
        this.socket.emit('user-disconnected');
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

}
