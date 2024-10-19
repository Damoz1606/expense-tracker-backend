import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BudgetRepository } from '../repositories/budget.repository';
import { BudgetRequest } from '../dto/request/buget.base.dto';
import { Budget } from '../dto/response/budget.base.dto';
import { BudgetWithExpenses } from '../dto/response/budget-with-expenses.dto';
import { plainToInstance } from 'class-transformer';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class BudgetService {
  constructor(
    @Inject(BudgetRepository) private readonly repository: BudgetRepository,
    @Inject(MailerService) private readonly mailer: MailerService
  ) { }

  /**
   * Creates a budget with the given data
   * @param user - Unique identifier of owner of the budget
   * @param data - Data required to create a budget
   * @returns Budget inside a promise
   */
  async create(user: number, data: BudgetRequest): Promise<Budget> {
    const current = await this.repository.create({ data: { ...data, userId: user } });
    if (!current) throw new BadRequestException();
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
    if (!budget) throw new NotFoundException();
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

    if (!budget) throw new NotFoundException();

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
    if (!budget) throw new NotFoundException();

    return plainToInstance(Budget, budget);
  }

  /**
   * Checks if the budget credit has not been surpassed by the expenses
   * @param id - Budget unique identifier
   */
  async checkBudgetExpenses(id: number): Promise<void> {
    const budget = await this.repository.findFirst({
      where: { id }, select: {
        budget: true,
        name: true,
        user: {
          select: {
            username: true,
            email: true
          }
        }, expenses: {
          select: { amount: true }
        }
      }
    });
    const spend = budget.expenses.reduce((prev, curr) => prev + curr.amount, 0);
    if (budget.budget <= spend) {
      this.mailer.send({
        recipients: [{
          address: budget.user.email,
          name: budget.user.email
        }],
        subject: 'Credit Alert',
        text: `Hi ${budget.user.username},\n\n 
        There was registered a new expense, that consumes your credit from <b>${budget.name}</b>\n
        You can expand your credit in your dashboard\n\n
        Best regards,`
      });
    }
  }
}
