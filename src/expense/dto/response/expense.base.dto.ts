import { Prisma, Expense as PrismaExpense } from "@prisma/client";
import { Expose } from "class-transformer";

export class Expense implements Omit<PrismaExpense, 'amount' | 'budgetId'> {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly amount: number;
    @Expose() public readonly createAt: Date;

    constructor({ id, name, amount, createAt }: {
        id: number,
        name: string,
        amount: Prisma.Decimal,
        createAt: Date
    }) {
        this.id = id;
        this.name = name;
        this.amount = amount.toNumber();
        this.createAt = createAt;
    }
}