import { Test, TestingModule } from '@nestjs/testing';
import { OrgController } from './org.controller';
import { HierarchyModule } from 'src/hierarchy/hierarchy.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { HierarchyService } from 'src/hierarchy/hierarchy.service';
import { EmployeeService } from 'src/employee/employee.service';
import { mockEmployeeService } from 'src/employee/employee.service.spec';
import { OrgModule } from './org.module';

describe('OrgController', () => {
  let controller: OrgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgController],
      providers: [HierarchyService, EmployeeService]
    }).overrideProvider(EmployeeService)
    .useValue(mockEmployeeService).compile();

    controller = module.get<OrgController>(OrgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
