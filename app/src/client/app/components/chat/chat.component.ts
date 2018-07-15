import { Component, OnInit } from '@angular/core';
import Message from '../../models/message';
import { WindowService } from '../../services/window.service';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  height = 100;
  chats = [];
  messages = null;

  constructor(
    private windowService: WindowService,
    private chat: ChatService,
    private http: HttpClient
  ) {
    this.height = this.windowService.freeHeight;
   }


  ngOnInit() {
    const userId = jwt_decode(localStorage.getItem('jwt_token')).id;
    
    this.http.get<any[]>(`api/chats/${userId}`).subscribe((data) => {
      this.chats = data;
    });

    this.chat.socket.subscribe(msg => {
      this.messages = [...this.messages, msg];
    });
  }

  onChatChecked(chat){
    this.chat.setChat(chat);
    this.http.get<Message[]>(`api/messages/${chat}`).subscribe((data) => {
      this.messages = data;
    });
  }
}
