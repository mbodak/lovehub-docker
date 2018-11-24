import * as mongoose from 'mongoose';

export const Matching = new mongoose.Schema({
  id: Number,
  userId: Number,
  firstName: String,
  lastName: String,
  age: Number,
  preference: String,
  email: String
}, {collection: 'User'});
