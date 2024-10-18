import { Inject, Injectable } from '@nestjs/common';
import { ExpenseRepository } from '../repositories/expense.repository';
import { Expense } from '../dto/response/expense.base.dto';
import { ExpenseRequest } from '../dto/request/expense.base.dto';
import { ExpenseEventService } from './expense-event.service';

@Injectable()
export class ExpenseService {
    constructor(
        @Inject(ExpenseRepository) private readonly repository: ExpenseRepository,
        @Inject(ExpenseEventService) private readonly event: ExpenseEventService
    ) { }

    /**
     * Creates a expense and link it to a budget
     * @param param0 - Data required to creates a expnese
     * @returns Expense object inside a promise
     */
    async create({ budget, ...data }: ExpenseRequest): Promise<Expense> {
        const newExpense = await this.repository.create({
            data: { ...data, budgetId: budget },
            select: {
                id: true,
                amount: true,
                createAt: true,
                name: true,
                budgetId: true,
                budget: {
                    select: {
                        name: true
                    }
                }
            }
        });

        this.event.emitExpenseCreated({ budget, ...data });
        return { ...newExpense, amount: newExpense.amount, budget: newExpense.budget.name };
    }

    /**
     * Retrives all the expenses that owns a user
     * @param user - Unique identifier of the owner
     * @returns Array of Expense objects inside a promise
     */
    async findMany(user: number): Promise<Expense[]> {
        const expenses = await this.repository.findMany({
            where: {
                budget: {
                    userId: user
                }
            },
            select: {
                id: true,
                amount: true,
                name: true,
                createAt: true,
                budget: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createAt: 'desc'
            }
        });
        return expenses.map(e => ({ ...e, budget: e.budget.name }));
    }

    /**
     * Retrives the latests expenses that a user owns
     * @param user - Unique identifier of the owner
     * @param take - Number of items required in the array
     * @returns Array of Expense objects inside a promise
     */
    async findLatest(user: number, take: number = 5): Promise<Expense[]> {
        const expenses = await this.repository.findMany({
            where: {
                budget: {
                    userId: user
                }
            },
            select: {
                id: true,
                amount: true,
                name: true,
                createAt: true,
                budget: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createAt: 'desc'
            },
            take: take
        });
        return expenses.map(e => ({ ...e, budget: e.budget.name }));
    }

    /**
     * Deletes one expense by it given identifier
     * @param id - Unique identifier of an expense
     * @returns Expense inside a promise
     */
    async deleteOne(id: number): Promise<Expense> {
        const expense = await this.repository.delete({
            where: { id },
            select: {
                id: true,
                amount: true,
                name: true,
                createAt: true,
                budget: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return { ...expense, amount: expense.amount, budget: expense.budget.name };
    }
}
