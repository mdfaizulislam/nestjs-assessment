import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { EmployeeModule } from 'src/employee/employee.module';
import { HierarchyModule } from 'src/hierarchy/hierarchy.module';

@Module({
  imports: [ HierarchyModule, EmployeeModule],
  controllers: [OrgController]
})
export class OrgModule {}
