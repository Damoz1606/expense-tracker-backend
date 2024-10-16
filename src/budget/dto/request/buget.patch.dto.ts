import { OmitType } from "@nestjs/mapped-types";
import { BudgetRequest } from "./buget.base.dto";

export class BudgetRequestPatch extends OmitType(BudgetRequest, ["budget"]) { }