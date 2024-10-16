import { Expose, Type } from "class-transformer";
import { Budget } from "./budget.base.dto";
import { Budget as PrismaBudget, Expense as PrismaExpense } from "@prisma/client";
import { Expense } from "src/expense/dto/response/expense.base.dto";

export class BudgetWithExpenses extends Budget {
    @Type(() => Expense)
    @Expose() public readonly expenses: Expense[];

    constructor(budget: PrismaBudget & { expenses: Omit<PrismaExpense, 'budgetId'>[] }) {
        super(budget);
        this.expenses = budget.expenses.map(e => new Expense(e))
    }
}