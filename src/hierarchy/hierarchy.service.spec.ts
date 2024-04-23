import { Test, TestingModule } from '@nestjs/testing';
import { HierarchyService } from './hierarchy.service';
import { EmployeeService } from 'src/employee/employee.service';
import { mockEmployeeService } from 'src/employee/employee.service.spec';

describe('HierarchyService', () => {
  let service: HierarchyService;
  let employeeService: EmployeeService;

  let validateHierarchy = (parentPositionId, child: object[]): boolean => {
    let result: boolean = true;
    if (child === null) return true;

    for (const c of child) {
      const childPositionId: number = c['positionId'];
      if (
        childPositionId == parentPositionId ||
        childPositionId <= parentPositionId
      ) {
        return false;
      }
      const children = c['child'];
      result = result && validateHierarchy(childPositionId, children);

      if (!result) {
        return false;
      }
    }

    return result;
  };

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

  it('hierarchy should be valid for employee id 1', async () => {
    const employee = mockEmployeeService.findOne(1);
    const id: number = employee['id'];
    const hierarchy = await service.findOne(id);
    const valid_result = validateHierarchy(employee.positionId, hierarchy);
    expect(valid_result).toBe(true);
  });

  it('hierarchy should be valid for employee id 2', async () => {
    const employee = mockEmployeeService.findOne(2);
    const hierarchy = await service.findOne(employee.id);
    const valid_result = validateHierarchy(employee.positionId, hierarchy);
    expect(valid_result).toBe(true);
  });

  it('hierarchy should be valid for employee id 5', async () => {
    const employee = mockEmployeeService.findOne(17);
    const hierarchy = await service.findOne(employee.id);
    const valid_result = validateHierarchy(employee.positionId, hierarchy);
    expect(valid_result).toBe(true);
  });

  it('hierarchy should be valid for employee id 10', async () => {
    const employee = mockEmployeeService.findOne(17);
    const hierarchy = await service.findOne(employee.id);
    const valid_result = validateHierarchy(employee.positionId, hierarchy);
    expect(valid_result).toBe(true);
  });

  it('hierarchy should be valid for employee id 12', async () => {
    const employee = mockEmployeeService.findOne(17);
    const hierarchy = await service.findOne(employee.id);
    const valid_result = validateHierarchy(employee.positionId, hierarchy);
    expect(valid_result).toBe(true);
  });

  it('hierarchy should be valid for employee id 14', async () => {
    const employee = mockEmployeeService.findOne(17);
    const hierarchy = await service.findOne(employee.id);
    const valid_result = validateHierarchy(employee.positionId, hierarchy);
    expect(valid_result).toBe(true);
  });

  it('hierarchy should be valid for employee id 17', async () => {
    const employee = mockEmployeeService.findOne(17);
    const hierarchy = await service.findOne(employee.id);
    const valid_result = validateHierarchy(employee.positionId, hierarchy);
    expect(valid_result).toBe(true);
  });
});
