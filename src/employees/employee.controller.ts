import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import { EmployeeService } from './employee.service';


@Controller('employee')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeService.findOne(+id);
  }
}
