import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employees/entities/employee.entity';

@Module({
  imports: [EmployeesModule]
})
export class AppModule {}
