import { Expose, Type } from "class-transformer";
import { Budget } from "./budget.base.dto";
import { Prisma, Budget as PrismaBudget, Expense as PrismaExpense } from "@prisma/client";

class Expense implements Omit<PrismaExpense, 'budgetId' | 'amount'> {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly amount: number;
    @Expose() public readonly createAt: Date;

    constructor(
        {
            id,
            name,
            amount,
            createAt,
        }: {
            id: number,
            name: string,
            amount: Prisma.Decimal,
            createAt: Date,
        }
    ) {
        this.id = id;
        this.name = name;
        this.amount = amount.toNumber();
        this.createAt = createAt;
    }
}

export class BudgetWithExpenses extends Budget {
    @Type(() => Expense)
    @Expose() public readonly expenses: Expense[];

    constructor(budget: PrismaBudget & { expenses: Omit<PrismaExpense, 'budgetId'>[] }) {
        super(budget);
        this.expenses = budget.expenses.map(e => new Expense(e))
    }
}