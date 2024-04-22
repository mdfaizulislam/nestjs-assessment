import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { HierarchyService } from '../hierarchy/hierarchy.service';

@Controller('org')
export class OrgController {
  constructor(private readonly orgService: HierarchyService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.orgService.findOne(+id);
  }
}
