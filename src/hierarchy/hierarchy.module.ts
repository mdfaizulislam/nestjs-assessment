import { Module } from '@nestjs/common';
import { HierarchyService } from './hierarchy.service';
import { HierarchyController } from './hierarchy.controller';
import { EmployeeModule } from '../employee/employee.module';
import { DatabaseModule } from '../database.providers';

@Module({
  imports: [EmployeeModule, DatabaseModule],
  controllers: [HierarchyController],
  providers: [HierarchyService],
  exports: [HierarchyService],
})
export class HierarchyModule {}
