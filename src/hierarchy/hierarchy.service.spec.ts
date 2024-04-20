import { Test, TestingModule } from '@nestjs/testing';
import { HierarchyService } from './hierarchy.service';
import { EmployeesService } from 'src/employees/employees.service';

describe('HierarchyService', () => {
  let service: HierarchyService;
  let employeeService: EmployeesService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HierarchyService,
        {
          provide: EmployeesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            findAllByPositionId: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<HierarchyService>(HierarchyService);
    employeeService = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('employeeService should be defined', () => {
    expect(employeeService).toBeDefined();
  });
});
