import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { DatabaseModule } from 'src/database.providers';
import { employeeProviders } from './employee.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, ...employeeProviders],
  exports: [EmployeeService, ...employeeProviders]
})
export class EmployeesModule {}
