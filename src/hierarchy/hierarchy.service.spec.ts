import { Test, TestingModule } from '@nestjs/testing';
import { HierarchyService } from './hierarchy.service';
import { EmployeeService } from 'src/employee/employee.service';
import { mockEmployeeService } from 'src/employee/employee.service.spec';

describe('HierarchyService', () => {
  let service: HierarchyService;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HierarchyService,
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    service = module.get<HierarchyService>(HierarchyService);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('employeeService should be defined', () => {
    expect(employeeService).toBeDefined();
  });
});
