import { Expose } from "class-transformer";

export class BudgetActivity {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly budget: number;
    @Expose() public readonly spend: number;
}