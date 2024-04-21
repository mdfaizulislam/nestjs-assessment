import { Sequelize } from 'sequelize-typescript';
import { Employee } from './employee/entities/employee.entity';
import { Module } from '@nestjs/common';
import databaseConfig from './config/database.config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const config = databaseConfig();
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
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
