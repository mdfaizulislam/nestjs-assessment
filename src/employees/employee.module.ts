import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeesController } from './employee.controller';
import { DatabaseModule } from 'src/database.providers';
import { employeeProviders } from './employee.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeeService, ...employeeProviders],
  exports: [EmployeeService, ...employeeProviders]
})
export class EmployeesModule {}
