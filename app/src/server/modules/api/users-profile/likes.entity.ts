import { AutoIncrement, BelongsToMany, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from '../users/user.entity';


@Table({tableName: 'Likes'})
export class Likes extends Model<Likes> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  whoLike: number;

  @Column
  whatLike: number;
}
