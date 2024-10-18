import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BudgetRepository } from '../repositories/budget.repository';
import { BudgetRequest } from '../dto/request/buget.base.dto';
import { Budget } from '../dto/response/budget.base.dto';
import { BudgetWithExpenses } from '../dto/response/budget-with-expenses.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BudgetService {
  constructor(
    @Inject(BudgetRepository) private readonly repository: BudgetRepository
  ) { }

  async create(user: number, data: BudgetRequest): Promise<Budget> {
    const current = await this.repository.create({ data: { ...data, userId: user } });
    if (!current) new BadRequestException();
    const { budget, ...newBudget } = current;
    return { ...newBudget, budget: budget };
  }

  async findMany(user: number): Promise<Budget[]> {
    const budget = await this.repository.findMany({
      where: {
        userId: user
      }
    });

    return budget.map(e => plainToInstance(Budget, e));
  }

  async findOne(id: number): Promise<BudgetWithExpenses> {
    const budget = await this.repository.findFirst({
      where: { id: id },
      include: {
        expenses: {
          select: {
            id: true,
            name: true,
            amount: true,
            createAt: true
          }
        }
      }
    });
    if (!budget) new NotFoundException();
    return plainToInstance(BudgetWithExpenses, budget);
  }

  async updateOne(id: number, data: Omit<BudgetRequest, 'budget'>): Promise<Budget> {
    const budget = await this.repository.update({
      where: { id: id },
      data: data
    });

    if (!budget) new NotFoundException();

    return plainToInstance(Budget, budget);
  }

  async deleteOne(id: number): Promise<Budget> {
    const budget = await this.repository.delete({
      where: { id: id },
    });

    if (!budget) new NotFoundException();

    return plainToInstance(Budget, budget);
  }
}
