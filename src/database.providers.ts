import { Sequelize } from 'sequelize-typescript';
import { Employee } from './employees/entities/employee.entity';
import { Module } from '@nestjs/common';
import { Constants } from './constants';
// import { databaseProviders } from './database.providers';

export const databaseProviders = [
  {
    provide: Constants.DB_ORM,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'test',
      });
      sequelize.addModels([Employee]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
