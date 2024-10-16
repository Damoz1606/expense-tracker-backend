import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BudgetRepository } from "../repositories/budget.repository";
import { BudgetActivity } from "../dto/response/budget-activity.dto";

@Injectable()
export class BudgetActivityService {
    constructor(
        @Inject(BudgetRepository) private readonly repository: BudgetRepository
    ) { }

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
            budget: budget.toNumber(),
            spend: expenses.reduce((prev, curr) => prev + curr.amount.toNumber(), 0)
        }
    }

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
            budget: budget.toNumber(),
            spend: expenses.reduce((prev, curr) => prev + curr.amount.toNumber(), 0)
        }));
    }
}