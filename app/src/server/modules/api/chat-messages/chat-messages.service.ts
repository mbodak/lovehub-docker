import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interfaces/chat.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatSchema } from './schemas/chat.schema';

@Component()
export class ChatMessagesService {
  constructor(@Inject('ChatModelToken') private readonly chatModel: Model<Chat>) {}

  async create(chatId, createMessageDto: CreateMessageDto): Promise<Chat> {
    return this.chatModel
      .findOne({ chatId: chatId }, function(err, chat){
        chat.messages.push(createMessageDto);

        return chat.save();
      });
  }

  async findByChat(id: number): Promise<any> {
    return await this.chatModel.findOne({ chatId: id }).select('messages -_id');
  }
}
