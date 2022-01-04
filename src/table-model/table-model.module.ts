import { Module } from '@nestjs/common';
import { TableModelService } from './table-model.service';
import { TableModelController } from './table-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableModelRepository } from './repositories/table-model.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TableModelRepository])],
  controllers: [TableModelController],
  providers: [TableModelService],
  exports: [TableModelService],
})
export class TableModelModule {}
