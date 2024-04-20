import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { mockData, mockEmployeeService } from './employees.service.spec';

describe('EmployeesController', () => {
  

  let controller: EmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService],
    })
      .overrideProvider(EmployeesService)
      .useValue(mockEmployeeService)
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
