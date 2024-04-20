import { Test, TestingModule } from '@nestjs/testing';
import { HierarchyController } from './hierarchy.controller';
import { HierarchyService } from './hierarchy.service';
import { EmployeesService } from 'src/employees/employees.service';

describe('HierarchyController', () => {
  let controller: HierarchyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HierarchyController],
      providers: [HierarchyService, EmployeesService],
    })
    .overrideProvider(EmployeesService)
    .useValue({
      findAll: jest.fn(),
      findOne: jest.fn(),
      findAllByPositionId: jest.fn()
    })
    .compile();

    controller = module.get<HierarchyController>(HierarchyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
