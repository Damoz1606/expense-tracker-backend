import { Inject, Injectable } from '@nestjs/common';
import { BudgetRepository } from '../repositories/budget.repository';
import { BudgetRequest } from '../dto/request/buget.base.dto';
import { Budget } from '../dto/response/budget.base.dto';
import { BudgetWithExpenses } from '../dto/response/budget-with-expenses.dto';

@Injectable()
export class BudgetService {
  constructor(
    @Inject(BudgetRepository) private readonly repository: BudgetRepository
  ) { }

  async create(user: number, data: BudgetRequest): Promise<Budget> {
    const { budget, ...newBudget } = await this.repository.create({ data: { ...data, userId: user } });
    return { ...newBudget, budget: budget.toNumber() };
  }

  async findMany(user: number): Promise<Budget[]> {
    const budget = await this.repository.findMany({
      where: {
        userId: user
      }
    });

    return budget.map(e => new Budget(e));
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
    return new BudgetWithExpenses(budget);
  }

  async updateOne(id: number, data: Omit<BudgetRequest, 'budget'>): Promise<Budget> {
    const budget = await this.repository.update({
      where: { id: id },
      data: data
    });

    return new Budget(budget);
  }

  async deleteOne(id: number): Promise<Budget> {
    const budget = await this.repository.delete({
      where: { id: id },
    });

    return new Budget(budget);
  }
}
