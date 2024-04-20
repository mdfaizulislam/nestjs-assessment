import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeesController } from './employee.controller';
import { mockData, mockEmployeeService } from './employee.service.spec';

describe('EmployeeController', () => {
  

  let controller: EmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeeService],
    })
      .overrideProvider(EmployeeService)
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
