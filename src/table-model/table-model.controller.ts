import { Controller, Get, Param } from '@nestjs/common';
import { TableModelService } from './table-model.service';

@Controller('table-model')
export class TableModelController {
  constructor(private readonly tableModelService: TableModelService) {}

  @Get()
  findAll() {
    return this.tableModelService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') id: string) {
    return this.tableModelService.findOne(id);
  }
}
