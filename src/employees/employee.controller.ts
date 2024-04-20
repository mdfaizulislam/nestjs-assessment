import {
  Controller,
  Get,
  Logger,
  Param
} from '@nestjs/common';
import { EmployeeService } from './employee.service';


@Controller('employee')
export class EmployeeController {
  private logger: Logger;
  constructor(private readonly employeeService: EmployeeService) {
    this.logger = new Logger(EmployeeController.name);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeService.findOne(+id);
  }
}
