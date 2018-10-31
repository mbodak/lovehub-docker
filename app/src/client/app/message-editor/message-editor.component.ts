import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ChatService} from '../services/chat.service';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.scss']
})
export class MessageEditorComponent implements OnInit {

  @Input() message;

  @Output() unSelect = new EventEmitter<any>();

  text = '';
  isEditable = false;

  constructor(private readonly chat: ChatService) { }

  ngOnInit() {
    this.text = this.message.text;
  }

  onDelete(msgId: string): void {
    this.chat.deleteMessage(msgId);
    this.unSelect.emit();
  }

  toggle(): void {
    this.isEditable = !this.isEditable;
  }

  onEdit(msgId: number, text: string): void {
    this.chat.editMessage(msgId, text);
    this.unSelect.emit();
  }

}
