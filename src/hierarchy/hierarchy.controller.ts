import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HierarchyService } from './hierarchy.service';
import { EmployeeService } from 'src/employees/employee.service';

@Controller('hierarchy')
export class HierarchyController {
  constructor(private readonly hierarchyService: HierarchyService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hierarchyService.findOne(+id);
  }

}
