import { Budget } from "@prisma/client";
import { IsEmpty, IsNumber, IsString } from "class-validator";

export class BudgetRequest implements Omit<Budget, 'id' | 'budget' | 'userId'> {
    @IsString()
    @IsEmpty()
    public readonly name: string;

    @IsNumber()
    public readonly budget: number;
}