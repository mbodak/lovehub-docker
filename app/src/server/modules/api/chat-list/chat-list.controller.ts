import {Body, Controller, Get, HttpCode, Post, Param} from '@nestjs/common';
import { ChatList } from './chat-list.entity';
import { ChatListService } from './chat-list.service';
import { ChatListDto } from './dto/chat-list.dto';
import { UsersProfileService } from '../users-profile/users-profile.service';
import { ChatMessagesService } from '../chat-messages/chat-messages.service';
import { PhotosService } from '../photos/photos.service';

@Controller('api/chats')
export class ChatListController {
  constructor(
    private chatsService: ChatListService,
    private usersProfileService: UsersProfileService,
    private chatMessagesService: ChatMessagesService,
    private photosService: PhotosService
  ) {}

  @HttpCode(201)
  @Post()
  async create(@Body() chatDto: ChatList) {
    const chat = await this.chatsService.create(chatDto);
    await this.chatMessagesService.createChat(chat.dataValues.chatId);
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param() params): Promise<any[]> {
    const id = parseInt(params.id);
    const chats = await this.chatsService.findByUser(id);

    const fullChats = chats.map(async (chat) => {
      const userId1 = chat.get('userId1');
      const userId2 = chat.get('userId2');
      const finalUser = userId1 === id ? userId2 : userId1;

      let user = await this.usersProfileService.findShortInfo(finalUser) || {};
      const userId = user.dataValues.userId;
      const avatar = await this.photosService.findAvatarByUserId(userId) || null;
      user = { ...user.dataValues, avatar };

      const lastMessage = await this.chatMessagesService.getLastMessage(chat.chatId) || null;

      return {
        chatId: chat.chatId,
        user,
        lastMessage
      };
    });

    return Promise.all(fullChats);
  }
}
