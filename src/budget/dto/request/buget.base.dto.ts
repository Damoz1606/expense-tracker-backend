import { Budget } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class BudgetRequest implements Omit<Budget, 'id' | 'budget' | 'userId'> {
    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    public readonly name: string;

    @IsNumber()
    @Min(0.01)
    public readonly budget: number;
}