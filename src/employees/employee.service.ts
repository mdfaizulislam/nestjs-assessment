import { Inject, Injectable, Logger } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { EMPLOYEE_RIPOSITORY } from './employee.constants';

@Injectable()
export class EmployeeService {
  private logger: Logger;
  constructor(
    @Inject(EMPLOYEE_RIPOSITORY)
    private employeeRepository: typeof Employee,
  ) {
    this.logger = new Logger(EmployeeService.name);
  }

  async findAll(): Promise<Employee[]> {
    try {
      return this.employeeRepository.findAll<Employee>({
        attributes: ['id', 'name', 'positionId', 'positionName'],
      });
    } catch (error) {
      this.logger.error('Error on fetching all employees', error);
      return [];
    }
  }

  findOne(id: number) {
    return this.employeeRepository.findOne({
      where: {
        id,
      },
      attributes: ['id', 'name', 'positionId', 'positionName'],
    });
  }

  async findAllByPositionId(positionId): Promise<Employee[]> {
    try {
      return this.employeeRepository.findAll({
        where: {
          positionId,
        },
        attributes: ['id', 'name', 'positionId', 'positionName'],
      });
    } catch (error) {
      this.logger.error(
        `Error on fetching all employees where the positionId ${positionId}`,
        error,
      );
      return [];
    }
  }
}
