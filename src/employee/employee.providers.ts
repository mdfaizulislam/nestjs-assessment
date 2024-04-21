import { EMPLOYEE_RIPOSITORY } from './employee.constants';
import { Employee } from './entities/employee.entity';

export const employeeProviders = [
  {
    provide: EMPLOYEE_RIPOSITORY,
    useValue: Employee,
  },
];
