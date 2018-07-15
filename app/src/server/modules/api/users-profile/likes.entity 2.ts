import {AutoIncrement, Column, Model, PrimaryKey, Table} from 'sequelize-typescript';


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
