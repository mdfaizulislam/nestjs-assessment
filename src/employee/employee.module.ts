import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { employeeProviders } from './employee.providers';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, ...employeeProviders],
  exports: [EmployeeService, ...employeeProviders],
})
export class EmployeeModule {
  static forRoot(arg0: { isGlobal: boolean; }): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
    throw new Error('Method not implemented.');
  }
}
