import { Document } from 'mongoose';

export interface Chat extends Document {
  readonly chatId: number;
  readonly messages: object[];
}
