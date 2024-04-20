import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { employeeProviders } from './employee.providers';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, ...employeeProviders],
  exports: [EmployeeService, ...employeeProviders]
})
export class EmployeesModule {}
