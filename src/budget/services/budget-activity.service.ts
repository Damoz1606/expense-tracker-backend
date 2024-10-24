import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BudgetRepository } from "../repositories/budget.repository";
import { BudgetActivity } from "../dto/response/budget-activity.dto";

@Injectable()
export class BudgetActivityService {
    constructor(
        @Inject(BudgetRepository) private readonly repository: BudgetRepository
    ) { }

    /**
     * Finds one budget and return its activity
     * @param id - Unique identifier of a budget 
     * @returns BudgetActivity inside a promise
     */
    async findOne(id: number): Promise<BudgetActivity> {
        const data = await this.repository.findFirst({
            where: { id: id },
            select: {
                id: true,
                name: true,
                budget: true,
                expenses: {
                    select: {
                        amount: true
                    }
                }
            }
        });
        if (!data) throw new NotFoundException();
        const { budget, expenses, ...current } = data;
        return {
            ...current,
            budget: budget,
            items: expenses.length,
            spend: expenses.reduce((prev, curr) => prev + curr.amount, 0)
        }
    }

    /**
     * Retrives many budget activities from a user
     * @param user - Unique identifier of the owner of the budgets
     * @returns Array of BudgetActivity inside a promise
     */
    async findMany(user: number): Promise<BudgetActivity[]> {
        const budgets = await this.repository.findMany({
            where: { userId: user },
            select: {
                id: true,
                name: true,
                budget: true,
                expenses: {
                    select: {
                        amount: true
                    }
                }
            }
        });
        return budgets.map(({ expenses, budget, ...data }) => ({
            ...data,
            items: expenses.length,
            budget: budget,
            spend: expenses.reduce((prev, curr) => prev + curr.amount, 0)
        }));
    }
}