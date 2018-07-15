import { ChatList } from './chat-list.entity';

export const chatListProviders = [
  {
    provide: 'ChatListRepository',
    useValue: ChatList,
  },
];
