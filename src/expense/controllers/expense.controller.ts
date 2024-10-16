import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { ExpenseRequest } from '../dto/request/expense.base.dto';
import { plainToInstance } from 'class-transformer';
import { Expense } from '../dto/response/expense.base.dto';
import { ExpenseArray } from '../dto/response/expense-array.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly service: ExpenseService) { }

  @Post()
  async create(@Body() data: ExpenseRequest): Promise<Expense> {
    const expense = await this.service.create(data);
    return plainToInstance(Expense, expense);
  }

  @Get('/:budget')
  async findMany(
    @Param('budget') budget: number
  ): Promise<ExpenseArray> {
    const data = await this.service.findMany(budget);
    return plainToInstance(ExpenseArray, { data });
  }

  @Get('latest')
  async findLatest(
    @CurrentUser() user: number
  ): Promise<ExpenseArray> {
    const data = await this.service.findLatest(user);
    return plainToInstance(ExpenseArray, { data });
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    await this.service.deleteOne(id);
    return ''
  }
}
