import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import Message from '../../models/message';
import { WindowService } from '../../services/window.service';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  height = 100;
  chats = [];
  chat: any;
  showDialogs = false;
  windowWidth: number = window.innerWidth;

  constructor(
    private windowService: WindowService,
    private chatService: ChatService,
    private http: HttpClient
  ) {
    this.height = this.windowService.freeHeight;
   }


  ngOnInit() {
    this.chatService.currentChatChange.subscribe(chat => {
      console.log('chat', chat);
      this.chat = chat;
    });

    this.chatService.userlistUpdate.subscribe(data => {
      console.log('data', data);
      this.chats = data;
    });

    this.chatService.showDialogsUpdate.subscribe(show => {
      console.log('show', show);
      this.showDialogs = show;
    });
  }

  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  resize(event) {
      this.windowWidth = window.innerWidth;
      this.height = this.windowService.freeHeight;
  }
}
