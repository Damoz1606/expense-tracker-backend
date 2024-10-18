import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { ExpenseRequest } from '../dto/request/expense.base.dto';
import { plainToInstance } from 'class-transformer';
import { Expense } from '../dto/response/expense.base.dto';
import { ExpenseArray } from '../dto/response/expense-array.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TokenPayload } from 'src/auth/token/token.payload';

@ApiTags('Expense')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly service: ExpenseService) { }

  @Post()
  async create(@Body() data: ExpenseRequest): Promise<Expense> {
    const expense = await this.service.create(data);
    return plainToInstance(Expense, expense);
  }

  @Get()
  async findMany(
    @CurrentUser() user: TokenPayload
  ): Promise<ExpenseArray> {
    const data = await this.service.findMany(user.sub);
    return plainToInstance(ExpenseArray, { data });
  }

  @Get('top/latest')
  async findLatest(
    @CurrentUser() user: TokenPayload
  ): Promise<ExpenseArray> {
    const data = await this.service.findLatest(user.sub);
    return plainToInstance(ExpenseArray, { data });
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    await this.service.deleteOne(+id);
    return ''
  }
}
