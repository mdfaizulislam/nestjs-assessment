import { Inject, Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class HierarchyService {
  @Inject(EmployeesService)
  private readonly employeeService: EmployeesService;
  findOne(id: number) {
    let map = new Map<number, object[]>();

    let solve =  async (employeeId): Promise<object[]> => {
      let employee: Employee = await this.employeeService.findOne(employeeId);
      
      if (!(employee instanceof Employee)) return [];

      // find lower position id
      let positionId: number = employee.positionId + 1;

      // check either do we have result in map or not, if we do, return result
      if (map.has(positionId)) return map.get(positionId);

      // we don't have result, so solve it first
      let juniorEmployees: Employee[] = await this.employeeService.findAllByPositionId(positionId);
      let hierarches: object[] = this.getHierarchyList(juniorEmployees);

      // find hierarchy of children
      for(let hierarchy of hierarches)
      {
        let children: object[] = await solve(hierarchy['id']);
        hierarchy['child'] = children.length > 0 ? children : null;
      }

      // save in map
      map.set(positionId, hierarches);

      // now return
      return hierarches;
    };

    return solve(id);
  }

  private getHierarchyList(employees: Employee[]): object[]
  {
    let hierarches: object[] = [];
    employees.forEach((emp) => {
      hierarches.push({id: emp.id, name: emp.name, positionId: emp.positionId, positionName: emp.positionName});
    });
    return hierarches;
  }
}
