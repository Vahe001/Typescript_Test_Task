import {Sequelize} from 'sequelize-typescript';
import Users from '../models/users';
import models from './../models'

export default async function() {
  const sequelize =  new Sequelize({
    database: 'test',
    dialect: 'postgres',
    username: 'postgres',
    password: '',
    storage: ':memory:',
    models: models, // or [Player, Team],
  });

  sequelize.addModels([Users]);

}
