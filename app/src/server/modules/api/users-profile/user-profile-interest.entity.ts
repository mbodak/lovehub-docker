import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserProfile } from './user-profile.entity';
import { Interest } from './interest.entity';

@Table({tableName: 'UserProfileInterest'})
export class UserProfileInterest extends Model<UserProfileInterest> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => UserProfile)
  @Column
  userProfileId: number;

  @ForeignKey(() => Interest)
  @Column
  interestId: number;

}
