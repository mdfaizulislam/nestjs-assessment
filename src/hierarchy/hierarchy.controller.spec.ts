import { Test, TestingModule } from '@nestjs/testing';
import { HierarchyController } from './hierarchy.controller';
import { HierarchyService } from './hierarchy.service';
import { EmployeeService } from 'src/employee/employee.service';
import { mockEmployeeService } from 'src/employee/employee.service.spec';

describe('HierarchyController', () => {
  let controller: HierarchyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HierarchyController],
      providers: [HierarchyService, EmployeeService],
    })
      .overrideProvider(EmployeeService)
      .useValue(mockEmployeeService)
      .compile();

    controller = module.get<HierarchyController>(HierarchyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
