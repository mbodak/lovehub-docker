import * as mongoose from 'mongoose';

export const UserProfileSchema = new mongoose.Schema({
  id: Number,
  userId: Number,
  firstName: String,
  lastName: String,
  age: Number,
  preference: String,
}, {collection: 'User'});
