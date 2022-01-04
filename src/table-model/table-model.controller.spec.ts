import { Test, TestingModule } from '@nestjs/testing';
import { TableModelController } from './table-model.controller';
import { TableModelService } from './table-model.service';

describe('TableModelController', () => {
  let controller: TableModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableModelController],
      providers: [TableModelService],
    }).compile();

    controller = module.get<TableModelController>(TableModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
