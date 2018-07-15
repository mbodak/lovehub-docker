import * as crypto from 'crypto';
import { AutoIncrement, BeforeCreate, Column, DataType, HasOne, Model, PrimaryKey, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({tableName: 'Chats'})
export class ChatList extends Model<ChatList> {
  @AutoIncrement
  @PrimaryKey
  @Column
  chatId: number;

  @ForeignKey(() => User)
  @Column
  userId1: number;

  @BelongsTo(() => User, { foreignKey: "userId1"})
  user1: User;

  
  @ForeignKey(() => User)
  @Column
  userId2: number;

  @BelongsTo(() => User, { foreignKey: "userId2"})
  user2: User;
}

