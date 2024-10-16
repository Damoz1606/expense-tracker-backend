import { Budget as PrismaBudget } from "@prisma/client";
import { Expose } from "class-transformer";

export class Budget implements Omit<PrismaBudget, 'userId' | 'budget'> {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly budget: number;

    constructor(
        {
            id,
            name,
            budget,
        }: PrismaBudget
    ) {
        this.id = id;
        this.name = name;
        this.budget = budget.toNumber();
    }
}