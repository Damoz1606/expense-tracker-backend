import { Test, TestingModule } from '@nestjs/testing';
import { KeyStoreController } from './key-store.controller';
import { KeyStoreService } from './key-store.service';

describe('KeyStoreController', () => {
  let controller: KeyStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyStoreController],
      providers: [KeyStoreService],
    }).compile();

    controller = module.get<KeyStoreController>(KeyStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
