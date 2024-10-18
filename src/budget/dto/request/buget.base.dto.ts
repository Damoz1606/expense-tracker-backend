import { Budget } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BudgetRequest implements Omit<Budget, 'id' | 'budget' | 'userId'> {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsNumber()
    public readonly budget: number;
}