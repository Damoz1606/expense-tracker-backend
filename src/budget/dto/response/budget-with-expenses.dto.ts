import { Expose, Type } from "class-transformer";
import { Budget } from "./budget.base.dto";
import { Expense as PrismaExpense } from "@prisma/client";

class Expense implements Omit<PrismaExpense, 'budgetId' | 'amount'> {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly amount: number;

    @Expose() public readonly createAt: Date;
}

export class BudgetWithExpenses extends Budget {
    @Type(() => Expense)
    @Expose() public readonly expenses: Expense[];
}