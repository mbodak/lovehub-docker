import { Component, OnInit, Input, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { EventEmitter } from 'events';

import Chat from '../../models/chat';

import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  userId: Number = null;
  text: String = '';
  windowWidth: number = window.innerWidth;
  messages: Array<any> = null;
  selectedMessage = null;

  @Input() chat: Chat;

  @ViewChild('scrollChat') private scrollChat: ElementRef;

  constructor(
    private chatService: ChatService,
    private authService: AuthService) {}

  ngOnInit() {
    this.chatService.messagesUpdate.subscribe(data => this.messages = data);
    this.userId = this.authService.getLoggedInUser().userId;

    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  resize(event) {
      this.windowWidth = window.innerWidth;
  }

  goBack() {
    this.chatService.closeMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.scrollChat.nativeElement.scrollTop = this.scrollChat.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMes(mes) {
    const text = this.text.trim();

    if (!!text.length) {
      const newMessage = {
        userId: this.userId,
        text
    };

    this.chatService.sendMessage(newMessage);
    this.text = '';
    }
  }

  setClasses(mes) {
    const ownMessage = mes.userId === this.userId;

    return {
      'align-items-end': ownMessage,
      'align-items-start': !ownMessage
    };
  }

  setMesClasses(mes) {
    const ownMessage = mes.userId === this.userId;

    return {
      'right': mes.userId === this.userId,
      'left': mes.userId !== this.userId,
      'unread': ownMessage && !mes.read
    };
  }
  onSelect(msg): void {
    if (msg.userId !== this.userId) {
      return;
    }

    if (this.selectedMessage === msg) {
      this.selectedMessage = null;
      return;
    }

    this.selectedMessage = msg;
    console.log(this.selectedMessage === msg);
  }

  unSelect() {
    this.selectedMessage = null;
  }

}
