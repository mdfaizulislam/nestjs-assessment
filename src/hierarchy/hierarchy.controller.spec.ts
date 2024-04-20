import { Test, TestingModule } from '@nestjs/testing';
import { HierarchyController } from './hierarchy.controller';
import { HierarchyService } from './hierarchy.service';
import { EmployeesService } from 'src/employees/employees.service';
import { mockEmployeeService } from 'src/employees/employees.service.spec';

describe('HierarchyController', () => {
  let controller: HierarchyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HierarchyController],
      providers: [HierarchyService, EmployeesService],
    })
    .overrideProvider(EmployeesService)
    .useValue(mockEmployeeService)
    .compile();

    controller = module.get<HierarchyController>(HierarchyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
