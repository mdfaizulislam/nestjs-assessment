import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { EmployeeModule } from '../employee/employee.module';
import { HierarchyModule } from '../hierarchy/hierarchy.module';

@Module({
  imports: [HierarchyModule, EmployeeModule],
  controllers: [OrgController],
})
export class OrgModule {}
