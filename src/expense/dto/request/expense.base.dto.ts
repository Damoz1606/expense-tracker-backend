import { Expense } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ExpenseRequest implements Omit<Expense, 'id' | 'createAt' | 'budgetId' | 'amount'> {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsNumber()
    public readonly amount: number;

    @IsNumber()
    public readonly budget: number;

}