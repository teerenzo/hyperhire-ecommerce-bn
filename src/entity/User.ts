// src/entity/User.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public points!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: new DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: "users",
  sequelize, 
});
