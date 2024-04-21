import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { Repository } from 'sequelize-typescript';
import { EMPLOYEE_RIPOSITORY } from './employee.constants';

export const mockData = [
  {
    id: 1,
    name: 'Name CTO',
    positionId: 1,
    positionName: 'CTO',
  },
  {
    id: 2,
    name: 'Name SSE 1',
    positionId: 2,
    positionName: 'Senior Software Engineer',
  },
  {
    id: 3,
    name: 'Name SSE 2',
    positionId: 2,
    positionName: 'Senior Software Engineer',
  },
  {
    id: 4,
    name: 'Name SSE 3',
    positionId: 2,
    positionName: 'Senior Software Engineer',
  },
  {
    id: 5,
    name: 'Name SSE 4',
    positionId: 2,
    positionName: 'Senior Software Engineer',
  },
  {
    id: 6,
    name: 'Name SE 1',
    positionId: 3,
    positionName: 'Software Engineer',
  },
  {
    id: 7,
    name: 'Name SE 2',
    positionId: 3,
    positionName: 'Software Engineer',
  },
  {
    id: 8,
    name: 'Name SE 3',
    positionId: 3,
    positionName: 'Software Engineer',
  },
  {
    id: 9,
    name: 'Name SE 4',
    positionId: 3,
    positionName: 'Software Engineer',
  },
  {
    id: 10,
    name: 'Name SE 5',
    positionId: 3,
    positionName: 'Software Engineer',
  },
  {
    id: 11,
    name: 'Name JSE 1',
    positionId: 4,
    positionName: 'Junior Software Engineer',
  },
  {
    id: 12,
    name: 'Name JSE 2',
    positionId: 4,
    positionName: 'Junior Software Engineer',
  },
  {
    id: 13,
    name: 'Name JSE 3',
    positionId: 4,
    positionName: 'Junior Software Engineer',
  },
  {
    id: 14,
    name: 'Name JSE 4',
    positionId: 4,
    positionName: 'Junior Software Engineer',
  },
  {
    id: 15,
    name: 'Name JSE 5',
    positionId: 4,
    positionName: 'Junior Software Engineer',
  },
  {
    id: 16,
    name: 'Name JSE 6',
    positionId: 4,
    positionName: 'Junior Software Engineer',
  },
  {
    id: 17,
    name: 'Name JSE 7',
    positionId: 4,
    positionName: 'Junior Software Engineer',
  }
];

export const mockEmployeeService = {
  findAll: () => mockData,
  findOne: (id: number) => {return mockData.find((md) => md['id'] === id)},
  findAllByPositionId: (positionId: number) => {
    let filteredData = mockData.filter((md) => md['positionId'] === positionId);
    return filteredData;
  }
};

describe('EmployeesService', () => {
  let service: EmployeeService;
  let employeesRepository: Repository<Employee>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all employees', () => {
    expect(service.findAll()).toBe(mockData);
  });

  it('should return employe with 1', () => {
    expect(service.findOne(1)).toBe(mockData[0]);
  });

  it('should return employe with 2', () => {
    expect(service.findOne(2)).toBe(mockData[1]);
  });

  it('should return employe with 10', () => {
    expect(service.findOne(10)).toBe(mockData[9]);
  });


  it('should return employe with 14', () => {
    expect(service.findOne(14)).toBe(mockData[13]);
  });

  it('should return all employees whose position id 2', async () => {
    let positionId = 2;
    let index = (await service.findAllByPositionId(positionId)).findIndex((emp) => emp['positionId'] !== positionId);
    expect(index).toBe(-1);
  });
});
