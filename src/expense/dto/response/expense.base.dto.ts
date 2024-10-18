import { Expense as PrismaExpense } from "@prisma/client";
import { Expose } from "class-transformer";

export class Expense implements Omit<PrismaExpense, 'amount' | 'budgetId'> {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly amount: number;
    @Expose() public readonly budget: string;
    @Expose() public readonly createAt: Date;
}