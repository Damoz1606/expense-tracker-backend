import { IResponseArray } from "src/shared/interfaces/response-array.interface";
import { Budget } from "./budget.base.dto";
import { Expose, Type } from "class-transformer";

export class BudgetArray implements IResponseArray<Budget> {
    @Type(() => Budget)
    @Expose() data: Budget[];
}