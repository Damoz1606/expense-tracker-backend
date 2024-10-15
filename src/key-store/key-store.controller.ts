import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeyStoreService } from './key-store.service';
import { CreateKeyStoreDto } from './dto/create-key-store.dto';
import { UpdateKeyStoreDto } from './dto/update-key-store.dto';

@Controller('key-store')
export class KeyStoreController {
  constructor(private readonly keyStoreService: KeyStoreService) {}

  @Post()
  create(@Body() createKeyStoreDto: CreateKeyStoreDto) {
    return this.keyStoreService.create(createKeyStoreDto);
  }

  @Get()
  findAll() {
    return this.keyStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keyStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeyStoreDto: UpdateKeyStoreDto) {
    return this.keyStoreService.update(+id, updateKeyStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyStoreService.remove(+id);
  }
}
