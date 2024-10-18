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

  /**
   * Creates a budget with the given data
   * @param user - Unique identifier of owner of the budget
   * @param data - Data required to create a budget
   * @returns Budget inside a promise
   */
  async create(user: number, data: BudgetRequest): Promise<Budget> {
    const current = await this.repository.create({ data: { ...data, userId: user } });
    if (!current) new BadRequestException();
    const { budget, ...newBudget } = current;
    return { ...newBudget, budget: budget };
  }

  /**
   * Retrives all the budgets owned by a user
   * @param user - Unique identifier of the owner
   * @returns Array of budgets
   */
  async findMany(user: number): Promise<Budget[]> {
    const budget = await this.repository.findMany({
      where: {
        userId: user
      }
    });

    return budget.map(e => plainToInstance(Budget, e));
  }

  /**
   * Retrives one budget with all the expenses associated to it
   * @param id - Unique identifier of the budget
   * @returns BudgetWithExpenses object inside a promise
   */
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

  /**
   * Updates one budget by it unique identifier and the given data
   * @param id - Unique identifier of a budget
   * @param data - Data required to update a budget
   * @returns Budget inside a promise
   */
  async updateOne(id: number, data: Omit<BudgetRequest, 'budget'>): Promise<Budget> {
    const budget = await this.repository.update({
      where: { id: id },
      data: data
    });

    if (!budget) new NotFoundException();

    return plainToInstance(Budget, budget);
  }

  /**
   * Deletes one budget by it unique identifier
   * @param id - Unique identifier of a budget
   * @returns Budget inside a promise
   */
  async deleteOne(id: number): Promise<Budget> {
    const budget = await this.repository.delete({
      where: { id: id },
    });

    if (!budget) new NotFoundException();

    return plainToInstance(Budget, budget);
  }
}
