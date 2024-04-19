import { Constants } from 'src/constants';
import { Employee } from './entities/employee.entity';

export const employeesProviders = [
  {
    provide: Constants.EMPLOYEE_RIPOSITORY,
    useValue: Employee,
  },
];
