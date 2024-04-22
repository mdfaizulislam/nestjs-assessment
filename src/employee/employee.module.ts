import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { employeeProviders } from './employee.providers';

@Module({
  providers: [EmployeeService, ...employeeProviders],
  exports: [EmployeeService, ...employeeProviders],
})
export class EmployeeModule {
}
