import { Document } from 'mongoose';

export interface Photo extends Document {
  readonly _id: string;
  readonly userId: number;
  readonly name: string;
  readonly base64: string;
  readonly avatar: boolean;
}
