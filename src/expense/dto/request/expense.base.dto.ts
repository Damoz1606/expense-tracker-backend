import { Expense } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class ExpenseRequest implements Omit<Expense, 'id' | 'createAt' | 'budgetId' | 'amount'> {
    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    public readonly name: string;

    @IsNumber()
    @Min(0.01)
    public readonly amount: number;

    @IsNumber()
    public readonly budget: number;

}