import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { EmployeesService } from './employees.service';
import { EmployeesModule } from './employees.module';
import { employeesProviders } from './employee.providers';
import { DatabaseModule, databaseProviders } from 'src/database.providers';
import { EmployeesController } from './employees.controller';

describe('EmployeesController', () => {
  const mockData = [
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
  let employeesService = {
    findAll: () => mockData,
    findOne: (id) => mockData.find(md => md.id == id),
    findAllByPositionId: () => ['test'],
  };

  let controller: EmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService],
    })
      .overrideProvider(EmployeesService)
      .useValue(employeesService)
      .compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`should return all employees`, () => {
    expect(controller.findAll()).toBe(mockData);
  });

  it('should return employee where employee id is 3', () => {
    const md = mockData.find(md => md.id == 3);
    expect(controller.findOne(3)).toBe(md);
  });
});
