import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { mockData, mockEmployeeService } from './employee.service.spec';

describe('EmployeeController', () => {
  let controller: EmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    })
      .overrideProvider(EmployeeService)
      .useValue(mockEmployeeService)
      .compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return employee where employee id is 3', () => {
    const md = mockData.find((md) => md.id == 3);
    expect(controller.findOne(3)).toBe(md);
  });
});
