import { Expose, Type } from "class-transformer";
import { IResponseArray } from "src/shared/interfaces/response-array.interface";
import { BudgetActivity } from "./budget-activity.dto";

export class BudgetActivityArray implements IResponseArray<BudgetActivity> {
    @Type(() => BudgetActivity)
    @Expose() public readonly data: BudgetActivity[];
}