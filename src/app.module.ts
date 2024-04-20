import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employee.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employees/entities/employee.entity';
import { HierarchyModule } from './hierarchy/hierarchy.module';
import { DatabaseModule } from './database.providers';

@Module({
  imports: [EmployeesModule, HierarchyModule, DatabaseModule]
})
export class AppModule {}
