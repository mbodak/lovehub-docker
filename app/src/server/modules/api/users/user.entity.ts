import * as crypto from 'crypto';
import {
  AutoIncrement, BeforeCreate, Column, DataType, HasOne, Model, PrimaryKey, Table, HasMany, BelongsTo,
  BelongsToMany, Length, Unique
} from 'sequelize-typescript';
import { UserProfile } from '../users-profile/user-profile.entity';
import { ChatList } from '../chat-list/chat-list.entity';

@Table({tableName: 'Users'})
export class User extends Model<User> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column({
    type: DataType.CHAR(100),
    allowNull: false,
    validate: {
      isEmail: true,
      isUnique: async (value: string, next: Function): Promise<any> => {
        const isExist = await User.findOne<User>({ where: { email: value }});
        if (isExist) {
          const error = new Error('User with this email already exist');
          next(error);
        }
        next();
      }
    }
  })
  email: string;

  @Length({min: 8, msg: 'It must be 8 characters at least'})
  @Column
  password: string;

  @HasOne(() => UserProfile)
  userProfile: UserProfile;



/*
  @BeforeCreate
  public static async hashPassword(user: User, options: any) {
    if (!options.transaction) throw new Error('Missing transaction.');

    user.password = crypto.createHmac('sha256', user.password).digest('hex');
  }
  */
}

