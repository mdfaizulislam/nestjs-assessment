import { Inject, Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { Employee } from 'src/employees/entities/employee.entity';
import { Hierarchy } from './entities/hierarchy.entity';
import { retry } from 'rxjs';

@Injectable()
export class HierarchyService {
  @Inject(EmployeesService)
  private readonly employeeService: EmployeesService;
  findOne(id: number) {
    let map = new Map<number, Hierarchy[]>();

    let solve =  async (employeeId): Promise<Hierarchy[]> => {
      let employee: Employee = await this.employeeService.findOne(employeeId);
      
      if (!(employee instanceof Employee)) return [];

      let hierarchy: Hierarchy = new Hierarchy(employee);

      // find lower position id
      let positionId: number = hierarchy.positionId + 1;


      if (positionId > 4 )
        return [];

        console.log("positionId: ", positionId);

      // check either do we have result in map or not, if we do, return result
      if (map.has(positionId)) return map.get(positionId);

      // we don't have result, so solve it first
      let juniorEmployees: Employee[] = await this.employeeService.findAllByPositionId(positionId);
      let hierarches: Hierarchy[] = this.getHierarchyList(juniorEmployees);
      console.log("hierarches: ", hierarches);

      for(let hierarchy of hierarches)
      {
        let children: Hierarchy[] = await solve(hierarchy.id);
        hierarchy.child = children.length > 0 ? children : null;
      }

      // save in map
      map.set(positionId, hierarches);

      // now return
      return hierarches;
    };

    return solve(id);
  }

  private getHierarchyList(employees: Employee[]): Hierarchy[]
  {
    let hierarches: Hierarchy[] = [];
    employees.forEach((emp) => {
      hierarches.push(new Hierarchy(emp));
    });
    return hierarches;
  }
}
