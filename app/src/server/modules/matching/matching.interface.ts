import { Document } from 'mongoose';


export interface Matching extends Document {
  readonly _id: number;
  readonly userId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly preference: string;
  readonly email: string;
}
