import { Document } from 'mongoose';

export interface Chat extends Document {
  readonly chatId: number;
  readonly messages: Array<{
    read: boolean,
    userId: number,
    text: string,
    creates: Date
  }>;
}
