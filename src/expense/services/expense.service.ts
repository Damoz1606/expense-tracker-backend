import { Inject, Injectable } from '@nestjs/common';
import { ExpenseRepository } from '../repositories/expense.repository';
import { Expense } from '../dto/response/expense.base.dto';
import { ExpenseRequest } from '../dto/request/expense.base.dto';

@Injectable()
export class ExpenseService {
    constructor(
        @Inject(ExpenseRepository) private readonly repository: ExpenseRepository
    ) { }

    async create({ budget, ...data }: ExpenseRequest): Promise<Expense> {
        const newExpense = await this.repository.create({
            data: { ...data, budgetId: budget },
            select: {
                id: true,
                amount: true,
                createAt: true,
                name: true,
                budget: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return { ...newExpense, amount: newExpense.amount.toNumber(), budget: newExpense.budget.name };
    }

    async findMany(budget: number): Promise<Expense[]> {
        const expenses = await this.repository.findMany({
            where: {
                budgetId: budget
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
        return expenses.map(e => new Expense({ ...e, budget: e.budget.name }));
    }

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
        return expenses.map(e => new Expense({ ...e, budget: e.budget.name }));
    }

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
        return { ...expense, amount: expense.amount.toNumber(), budget: expense.budget.name };
    }
}
