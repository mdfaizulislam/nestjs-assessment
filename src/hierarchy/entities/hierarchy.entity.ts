import { Model } from "sequelize";
import { Column } from "sequelize-typescript";
import { Employee } from "src/employees/entities/employee.entity";
export class Hierarchy {
    child: Hierarchy[] = null;
    id : number;
    name: string;
    positionId: number;
    positionName: string;

    constructor(employee: Employee)
    {
        // super();
        this.id = employee.id;
        this.name = employee.name;
        this.positionId = employee.positionId;
        this.positionName = employee.name;        
    }
}
