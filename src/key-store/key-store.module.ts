import { Module } from '@nestjs/common';
import { KeyStoreService } from './key-store.service';
import { KeyStoreController } from './key-store.controller';

@Module({
  controllers: [KeyStoreController],
  providers: [KeyStoreService],
})
export class KeyStoreModule {}
