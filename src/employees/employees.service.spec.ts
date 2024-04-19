import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    console.log("empS ", service);
    expect(service).toBeDefined();
  });

  it ('should return employee by id 1', () => {
    expect(service.findOne(1)).toBeTruthy();
  });
});
