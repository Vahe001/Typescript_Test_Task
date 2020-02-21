import { Model, Column, Table } from "sequelize-typescript";
@Table
export default class Users extends Model<Users> {



  @Column({
    unique: true,
    allowNull: false
  })
  username!: string;

  @Column({
    unique: true,
    allowNull: false
  })
  email!: string;

  @Column({
    allowNull: false
  })
  password!: string;


}