import {Body, Controller, Get, HttpCode, Request, Response, Post, Param, HttpStatus} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatMessagesService } from './chat-messages.service';

@Controller('api/messages')
export class ChatMessagesController {
  constructor( private messagesService: ChatMessagesService) {}

  @HttpCode(201)
  @Post()
  async create(@Request() req, @Response() res, @Body() data) {
    const createdMessage = await this.messagesService.create(data.chatId, {
        userId: data.message.userId,
        text: data.message.text
    } as CreateMessageDto);

    res.status(HttpStatus.OK).json({data: 'success'});
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param() params): Promise<any[]> {
    const id = parseInt(params.id);
    const chat = await this.messagesService.findByChat(id);

    return chat.messages;
  }
}
