import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class Employee extends Model {
//   @Column
//   id: number;

  @Column
  name: string;

  @Column
  positionId: number;

  @Column
  positionName: string;
}
