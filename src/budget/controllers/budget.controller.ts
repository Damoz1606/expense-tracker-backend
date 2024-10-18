import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../dto/response/budget.base.dto';
import { BudgetRequest } from '../dto/request/buget.base.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { plainToInstance } from 'class-transformer';
import { BudgetArray } from '../dto/response/budget-array.dto';
import { BudgetWithExpenses } from '../dto/response/budget-with-expenses.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TokenPayload } from 'src/auth/token/token.payload';

@ApiTags('Budget')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('budgets')
export class BudgetController {
  constructor(private readonly service: BudgetService) { }

  @Post()
  async create(
    @Body() body: BudgetRequest,
    @CurrentUser() user: TokenPayload
  ): Promise<Budget> {
    const budget = await this.service.create(user.sub, body);
    return plainToInstance(Budget, budget);
  }

  @Get()
  async findMany(
    @CurrentUser() user: TokenPayload
  ): Promise<BudgetArray> {
    const data = await this.service.findMany(user.sub);
    return plainToInstance(BudgetArray, { data });
  }

  @Get('budget/:id')
  async findOne(
    @Param('id') id: number
  ): Promise<BudgetWithExpenses> {
    const data = await this.service.findOne(+id);
    return plainToInstance(BudgetWithExpenses, data);
  }

  @Put('budget/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() data: BudgetRequest
  ): Promise<Budget> {
    const budget = await this.service.updateOne(+id, data);
    return plainToInstance(Budget, budget);
  }

  @Delete('budget/:id')
  async deleteOne(
    @Param('id') id: number,
  ): Promise<any> {
    await this.service.deleteOne(+id);
    return ''
  }
}
