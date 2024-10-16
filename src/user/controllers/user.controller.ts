import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRequest } from '../dto/request/user.base.dto';
import { User } from '../dto/response/user.base.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @Get()
  async findOne(
    @CurrentUser() user: number
  ): Promise<User> {
    const data = await this.service.findOne(user);
    return plainToInstance(User, data);
  }
}
