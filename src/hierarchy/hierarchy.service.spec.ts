import { Test, TestingModule } from '@nestjs/testing';
import { HierarchyService } from './hierarchy.service';
import { EmployeesService } from 'src/employees/employees.service';
import { mockEmployeeService } from 'src/employees/employees.service.spec';

describe('HierarchyService', () => {
  let service: HierarchyService;
  let employeeService: EmployeesService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HierarchyService,
        {
          provide: EmployeesService,
          useValue: mockEmployeeService,
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
