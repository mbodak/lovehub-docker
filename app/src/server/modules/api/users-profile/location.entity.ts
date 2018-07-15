import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserProfile } from './user-profile.entity';


@Table({tableName: 'Location'})
export class Location extends Model<Location> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  longitude: number;

  @Column
  latitude: number;

  @ForeignKey(() => UserProfile)
  @Column
  userProfileId: number;

  @BelongsTo(() => UserProfile)
  userProfile: UserProfile;
}
