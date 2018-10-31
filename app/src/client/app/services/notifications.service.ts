import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as io from 'socket.io-client';

@Injectable()
export class NotificationsService {
  private serverURL = 'http://localhost:5400';
  private socket = io(`${this.serverURL}`);  // (`${this.serverURL}/notifications`)
  private userState: boolean;
  private userStateData = new BehaviorSubject<boolean>(this.userState);

  public isUserOnline = this.userStateData.asObservable();

  constructor() {
  }

  sendOnlineUser(userParameters) {
    this.socket.emit('user-parameters', userParameters);
  }

  sendMessage(receiverUserId) {
    this.socket.emit('send-notification', receiverUserId);
  }

  checkIfUserIsOnline(profileOwnerId) {
    this.socket.emit('is-user-online', profileOwnerId);
  }

  disconnectUser() {
    this.socket.emit('user-disconnected');
  }

  getMessages() {
    return new Observable(observer => {
      this.socket.on('connection-successful', () => {
        console.log('Notifications connected to server via websocket');
      });

      this.socket.on('receive-notification', (message) => {
        observer.next(message);
      });

      this.socket.on('user-state', (state) => {
        this.userStateData.next(state);
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
