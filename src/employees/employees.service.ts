import { Inject, Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { EMPLOYEE_RIPOSITORY } from './employees.constants';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EMPLOYEE_RIPOSITORY)
    private employeesRepository: typeof Employee,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.findAll<Employee>({attributes: ["id", "name", "positionId", "positionName"]});
  }

  findOne(id: number) {
    return this.employeesRepository.findOne({
      where: {
        id,
      },
      attributes: ["id", "name", "positionId", "positionName"]
    });
  }

   async findAllByPositionId(positionId): Promise<Employee[]> {
    return this.employeesRepository.findAll({
      where: {
        positionId
      },
      attributes: ["id", "name", "positionId", "positionName"]
    });
  }
}
