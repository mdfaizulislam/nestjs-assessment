import { Module } from '@nestjs/common';
import { HierarchyService } from './hierarchy.service';
import { HierarchyController } from './hierarchy.controller';
import { EmployeeModule } from 'src/employee/employee.module';
import { DatabaseModule } from 'src/database.providers';

@Module({
  imports: [EmployeeModule, DatabaseModule],
  controllers: [HierarchyController],
  providers: [HierarchyService],
  exports: [HierarchyService],
})
export class HierarchyModule {}
