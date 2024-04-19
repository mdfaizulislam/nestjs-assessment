import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employees/entities/employee.entity';
import { HierarchyModule } from './hierarchy/hierarchy.module';

@Module({
  imports: [EmployeesModule, HierarchyModule]
})
export class AppModule {}
