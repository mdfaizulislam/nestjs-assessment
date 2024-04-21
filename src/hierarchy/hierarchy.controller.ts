import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { HierarchyService } from './hierarchy.service';

@Controller('hierarchy')
export class HierarchyController {
  // private logger: Logger;
  constructor(private readonly hierarchyService: HierarchyService) {
    // this.logger = new Logger(HierarchyController.name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hierarchyService.findOne(+id);
  }
}
