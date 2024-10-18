import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ExpenseRequest } from "../dto/request/expense.base.dto";
import { BudgetEvent, OnBudgetEventExpenseAdded } from "src/budget/events/budget.events";

@Injectable()
export class ExpenseEventService {
    constructor(
        @Inject(EventEmitter2) private readonly emitter: EventEmitter2
    ) { }

    emitExpenseCreated({ budget }: ExpenseRequest): void {
        this.emitter.emit(BudgetEvent.ON_EXPENSE_ADDED, new OnBudgetEventExpenseAdded(budget));
    }
}