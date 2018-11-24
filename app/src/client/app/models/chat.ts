import { UserProfile } from './user-profile';

export default class Chat {
  chatId: number;
  user: UserProfile;
  lastMessage: any;
  read: boolean;

  constructor(chatId: number, user: UserProfile, lastMessage: object, read: boolean) {
      this.chatId = chatId;
      this.user = user;
      this.lastMessage = lastMessage;
      this.read = read;
    }
  }
  