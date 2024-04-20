import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseModule } from 'src/database.providers';
import { employeesProviders } from './employee.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, ...employeesProviders],
  exports: [EmployeesService, ...employeesProviders]
})
export class EmployeesModule {}
