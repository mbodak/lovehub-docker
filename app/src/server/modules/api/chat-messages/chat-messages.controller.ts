import {Body, Controller, Get, HttpCode, Request, Response, Post, Param, HttpStatus} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatMessagesService } from './chat-messages.service';

@Controller('api/messages')
export class ChatMessagesController {
  constructor( private messagesService: ChatMessagesService) {}
  
  @HttpCode(200)
  @Get(':id')
  async findById(@Param() params): Promise<any[]> {
    const id = parseInt(params.id);
    const chat = await this.messagesService.findByChat(id);

    return chat.messages;
  }
}
