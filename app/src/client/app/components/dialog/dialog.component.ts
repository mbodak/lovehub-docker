import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { ChatService } from '../../services/chat.service';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'chat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  userId: Number = null;
  text: String = '';
  chatId: Number = null;

  @Input() messages: Array<object>;

  constructor( private chat: ChatService) {}

  ngOnInit() {
    this.chat.currentChatIdChange.subscribe(id => {
      this.chatId = id;
    });

    this.userId = jwt_decode(localStorage.getItem('jwt_token')).id;
  }

  sendMes(mes){
    const message = {
      chatId: this.chatId,
      message: {
        userId: this.userId,
        text: this.text
      }
    };
    this.chat.sendMessage(message);
    this.text = '';
  }

}
