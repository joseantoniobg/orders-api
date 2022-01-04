import { EntityRepository, Repository } from 'typeorm';
import { TableModel } from '../entities/table-model.entity';

@EntityRepository(TableModel)
export class TableModelRepository extends Repository<TableModel> {}
