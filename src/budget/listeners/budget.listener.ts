import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { BudgetEvent, OnBudgetEventExpenseAdded } from "../events/budget.events";
import { BudgetService } from "../services/budget.service";

@Injectable()
export class BudgetListener {
    constructor(
        @Inject(BudgetService) private readonly budgetService: BudgetService
    ) { }

    @OnEvent(BudgetEvent.ON_EXPENSE_ADDED)
    async onExpenseAdded({ budget }: OnBudgetEventExpenseAdded) {
        await this.budgetService.checkBudgetExpenses(budget);
    }
}