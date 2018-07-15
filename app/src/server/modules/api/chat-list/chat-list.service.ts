import { Component, Inject } from '@nestjs/common';
import { ChatList } from './chat-list.entity';
import { ChatListDto } from './dto/chat-list.dto';
import { Op } from 'sequelize';

@Component()
export class ChatListService {

  constructor(@Inject('ChatListRepository') private readonly chatsRepository: typeof ChatList) {}

  async create(chatDto: ChatListDto): Promise<ChatList> {
    const chat = new ChatList();
    chat.userId1 = chatDto.userId1;
    chat.userId1 = chatDto.userId1;

    return await chat.save();
  }

  async findByUser(id: number): Promise<ChatList[]> {
    return await this.chatsRepository.findAll<ChatList>({
        where: {
            [Op.or]: [
                { userId1: id},
                { userId2: id }
            ]
        }
    });
  }
}
