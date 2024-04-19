import { Module } from '@nestjs/common';
import { HierarchyService } from './hierarchy.service';
import { HierarchyController } from './hierarchy.controller';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [EmployeesModule],
  controllers: [HierarchyController],
  providers: [HierarchyService],
})
export class HierarchyModule {}
