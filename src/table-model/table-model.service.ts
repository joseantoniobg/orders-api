import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableModel } from './entities/table-model.entity';
import { TableModelRepository } from './repositories/table-model.repository';
@Injectable()
export class TableModelService {
  constructor(
    @InjectRepository(TableModelRepository)
    private tableModelRepository: TableModelRepository,
  ) {}

  async findAll() {
    return await this.tableModelRepository.find();
  }

  async findOne(name: string): Promise<TableModel[]> {
    return await this.tableModelRepository.find({ where: { name } });
  }
}
