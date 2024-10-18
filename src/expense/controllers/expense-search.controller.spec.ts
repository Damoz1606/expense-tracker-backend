import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseSearchController } from './expense-search.controller';

describe('ExpenseSearchController', () => {
  let controller: ExpenseSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseSearchController],
    }).compile();

    controller = module.get<ExpenseSearchController>(ExpenseSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
