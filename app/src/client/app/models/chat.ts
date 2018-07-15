import { UserProfile } from './user-profile';

export default class Chat {
  chatId: number;
  user: UserProfile;

  constructor(chatId: number, user: UserProfile) {
      this.chatId = chatId;
      this.user = user;
    }
  }
