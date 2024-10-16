import { IResponseArray } from "src/shared/interfaces/response-array.interface";
import { Expense } from "./expense.base.dto";
import { Expose, Type } from "class-transformer";

export class ExpenseArray implements IResponseArray<Expense> {
    @Expose()
    @Type(() => Expense)
    public readonly data: Expense[];
}