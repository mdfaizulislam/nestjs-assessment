import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { Repository } from 'sequelize-typescript';
import { EMPLOYEE_RIPOSITORY } from './employees.constants';

export const mockData = [
  {
    id: 1,
    name: 'Name CTO',
    positionId: 1,
    PositionName: 'CTO',
  },
  {
    id: 2,
    name: 'Name SSE 1',
    positionId: 2,
    PositionName: 'Senior Software Engineer',
  },
  {
    id: 3,
    name: 'Name SSE 2',
    positionId: 2,
    PositionName: 'Senior Software Engineer',
  },
  {
    id: 4,
    name: 'Name SSE 3',
    positionId: 2,
    PositionName: 'Senior Software Engineer',
  },
  {
    id: 5,
    name: 'Name SSE 4',
    positionId: 2,
    PositionName: 'Senior Software Engineer',
  },
  {
    id: 6,
    name: 'Name SE 1',
    positionId: 3,
    PositionName: 'Software Engineer',
  },
  {
    id: 7,
    name: 'Name SE 2',
    positionId: 3,
    PositionName: 'Software Engineer',
  },
  {
    id: 8,
    name: 'Name SE 3',
    positionId: 3,
    PositionName: 'Software Engineer',
  },
  {
    id: 9,
    name: 'Name SE 4',
    positionId: 3,
    PositionName: 'Software Engineer',
  },
  {
    id: 10,
    name: 'Name SE 5',
    positionId: 3,
    PositionName: 'Software Engineer',
  },
  {
    id: 11,
    name: 'Name JSE 1',
    positionId: 4,
    PositionName: 'Junior Software Engineer',
  },
  {
    id: 12,
    name: 'Name JSE 2',
    positionId: 4,
    PositionName: 'Junior Software Engineer',
  },
  {
    id: 13,
    name: 'Name JSE 3',
    positionId: 4,
    PositionName: 'Junior Software Engineer',
  },
  {
    id: 14,
    name: 'Name JSE 4',
    positionId: 4,
    PositionName: 'Junior Software Engineer',
  },
  {
    id: 15,
    name: 'Name JSE 5',
    positionId: 4,
    PositionName: 'Junior Software Engineer',
  },
  {
    id: 16,
    name: 'Name JSE 6',
    positionId: 4,
    PositionName: 'Junior Software Engineer',
  },
  {
    id: 17,
    name: 'Name JSE 7',
    positionId: 4,
    PositionName: 'Junior Software Engineer',
  },
];

export const mockEmployeeService = {
  findAll: () => mockData,
  findOne: (id) => mockData.find(md => md.id == id),
  findAllByPositionId: () => ['test'],
};

describe('EmployeesService', () => {

  let service: EmployeesService;
  let employeesRepository: Repository<Employee>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: EMPLOYEE_RIPOSITORY,
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    employeesRepository = module.get<Repository<Employee>>(EMPLOYEE_RIPOSITORY);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('employeesRepository should be defined', () => {
    expect(employeesRepository).toBeDefined();
  });

  it('should return all employees', () => {
    expect(service.findAll()).toBeTruthy();
  });

  it('should return all employees whose position id 2', () => {
    expect(service.findAllByPositionId(2)).toBeTruthy();
  });
});
