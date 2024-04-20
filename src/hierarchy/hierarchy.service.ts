import { Inject, Injectable, Logger } from '@nestjs/common';
import { EmployeeService } from 'src/employees/employee.service';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class HierarchyService {
  private logger: Logger;
  constructor(private employeeService: EmployeeService) {
    this.logger = new Logger(HierarchyService.name);
  }
  findOne(id: number) {
    try {
      let map = new Map<number, object[]>();

      let findHierarchy = async (employeeId): Promise<object[]> => {
        let employee: Employee = await this.employeeService.findOne(employeeId);

        if (!(employee instanceof Employee)) return [];

        // find lower position id
        let positionId: number = employee.positionId + 1;

        // check either do we have result in map or not, if we do, return result
        if (map.has(positionId)) return map.get(positionId);

        // we don't have result, so solve it first
        let juniorEmployees: Employee[] =
          await this.employeeService.findAllByPositionId(positionId);
        let hierarches: object[] = this.getFormattedEmployees(juniorEmployees);

        // find hierarchy of children
        for (let hierarchy of hierarches) {
          let children: object[] = await findHierarchy(hierarchy['id']);
          hierarchy['child'] = children.length > 0 ? children : null;
        }

        // save in map
        map.set(positionId, hierarches);

        // now return
        return hierarches;
      };

      return findHierarchy(id);
    } catch (error) {
      this.logger.error('Error on finding hierarchy of employee id ' + id, error);
    }
  }

  private getFormattedEmployees(employees: Employee[]): object[] {
    let hierarches: object[] = [];
    employees.forEach((emp) => {
      hierarches.push({
        id: emp.id,
        name: emp.name,
        positionId: emp.positionId,
        positionName: emp.positionName,
      });
    });
    return hierarches;
  }
}
