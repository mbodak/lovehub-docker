import { AutoIncrement, BelongsToMany, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserProfile } from './user-profile.entity';
import { UserProfileInterest } from './user-profile-interest.entity';

@Table({tableName: 'Interest'})
export class Interest extends Model<Interest> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @ForeignKey(() => UserProfile)
  @Column
  userProfileId: number;

  @BelongsToMany(() => UserProfile, () => UserProfileInterest)
  authors: UserProfile[];
}
