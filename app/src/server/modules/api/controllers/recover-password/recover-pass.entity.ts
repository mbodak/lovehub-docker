import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique} from 'sequelize-typescript';

@Table({tableName: 'RecoverPass'})
export class RecoverPassEntity extends Model<RecoverPassEntity> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Unique
  @Column
  token: string;

  @Column
  userId: number;

  @Column
  date: string;

  @Column
  used: boolean;
}
