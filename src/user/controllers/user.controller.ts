import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRequest } from '../dto/request/user.base.dto';
import { User } from '../dto/response/user.base.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post()
  async create(
    @Body() data: UserRequest
  ): Promise<User> {
    const user = await this.service.create(data);
    return plainToInstance(User, user);
  }

  @Get()
  async findOne(
    @CurrentUser() user: number
  ): Promise<User> {
    const data = await this.service.findOne(user);
    return plainToInstance(User, data);
  }
}
