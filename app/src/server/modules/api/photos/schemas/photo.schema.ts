import * as mongoose from 'mongoose';

export const PhotoSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  base64: String,
  avatar: Boolean,
  time: {
    type: Date,
    default: Date.now()
  }
}, {collection: 'Photo'});
