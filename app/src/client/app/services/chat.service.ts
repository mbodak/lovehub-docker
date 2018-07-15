import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChatService {
  currentChatId: number;
  currentChatIdChange: Subject<number> = new Subject<number>();
  socket: Subject<any>;
  
  constructor(private wsService: WebsocketService) {
    this.socket = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      });

    this.currentChatIdChange.subscribe((value) => {
        this.currentChatId = value;
    });
   }

  sendMessage(data){
    if(this.currentChatId) {
      this.socket.next({event: 'send', data, chatId: this.currentChatId});
    }
  }

  setChat(chatId: number){
    this.socket.next({event: 'changeRoom', prevChatId: this.currentChatId, chatId});
    this.currentChatIdChange.next(chatId);
  }
}