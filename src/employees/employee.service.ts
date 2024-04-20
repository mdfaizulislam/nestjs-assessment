import { Inject, Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { EMPLOYEE_RIPOSITORY } from './employee.constants';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_RIPOSITORY)
    private employeeRepository: typeof Employee,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.findAll<Employee>({attributes: ["id", "name", "positionId", "positionName"]});
  }

  findOne(id: number) {
    return this.employeeRepository.findOne({
      where: {
        id,
      },
      attributes: ["id", "name", "positionId", "positionName"]
    });
  }

   async findAllByPositionId(positionId): Promise<Employee[]> {
    return this.employeeRepository.findAll({
      where: {
        positionId
      },
      attributes: ["id", "name", "positionId", "positionName"]
    });
  }
}
