import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

import Chat from '../../models/chat';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent implements OnInit {
  activeChat: number;
  @Input() chat: Chat;
  @Output() onChatChecked = new EventEmitter<Number>();

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.currentChatIdChange.subscribe(id => {
      this.activeChat = id;
    });
  }

  checkChat(chatId) {
    this.onChatChecked.emit(chatId);
  }
}
