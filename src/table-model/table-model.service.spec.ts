import { Test, TestingModule } from '@nestjs/testing';
import { TableModelService } from './table-model.service';

describe('TableModelService', () => {
  let service: TableModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableModelService],
    }).compile();

    service = module.get<TableModelService>(TableModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
