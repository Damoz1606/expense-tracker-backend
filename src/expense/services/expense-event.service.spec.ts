import { EventEmitter2 } from "@nestjs/event-emitter";
import { ExpenseEventService } from "./expense-event.service";
import { TestBed } from "@automock/jest";
import { ExpenseRequest } from "../dto/request/expense.base.dto";
import { BudgetEvent, OnBudgetEventExpenseAdded } from "src/budget/events/budget.events";

describe('ExpenseEventService', () => {
    let service: ExpenseEventService;
    let emitter: jest.Mocked<EventEmitter2>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExpenseEventService).compile();

        service = unit
        emitter = unitRef.get(EventEmitter2);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('emitExpenseCreated', () => {
        const expenseRequest: ExpenseRequest = {
            budget: 1,
            name: "Test budget",
            amount: 5000
        };
        it('should emit ON_EXPENSE_ADDED event with the correct payload', () => {
            service.emitExpenseCreated(expenseRequest);
            expect(emitter.emit).toHaveBeenCalledWith(BudgetEvent.ON_EXPENSE_ADDED, new OnBudgetEventExpenseAdded(expenseRequest.budget));
        });
    });
});