import { Injectable } from '@nestjs/common';
import { CreateKeyStoreDto } from './dto/create-key-store.dto';
import { UpdateKeyStoreDto } from './dto/update-key-store.dto';

@Injectable()
export class KeyStoreService {
  create(createKeyStoreDto: CreateKeyStoreDto) {
    return 'This action adds a new keyStore';
  }

  findAll() {
    return `This action returns all keyStore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keyStore`;
  }

  update(id: number, updateKeyStoreDto: UpdateKeyStoreDto) {
    return `This action updates a #${id} keyStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} keyStore`;
  }
}
