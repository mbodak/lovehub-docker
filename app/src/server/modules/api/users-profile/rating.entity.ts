import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserProfile} from './user-profile.entity';

@Table({tableName: 'Rating'})
export class Rating extends Model<Rating> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  views: number;

  @Column
  likes: number;

  @ForeignKey(() => UserProfile)
  @Column
  userProfileId: number;

  @BelongsTo(() => UserProfile)
  userProfile: UserProfile;
}
