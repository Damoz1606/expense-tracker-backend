import { TestBed } from "@automock/jest";
import { BudgetService } from "../services/budget.service";
import { BudgetListener } from "./budget.listener";
import { OnBudgetEventExpenseAdded } from "../events/budget.events";

describe('BudgetListener', () => {
    let listener: BudgetListener;
    let service: jest.Mocked<BudgetService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(BudgetListener).compile();

        listener = unit;
        service = unitRef.get(BudgetService);
    });

    describe('onExpenseAdded', () => {
        const budgetId = 1;
        const budgetEvent: OnBudgetEventExpenseAdded = { budget: budgetId };

        it('should call checkBudgetExpenses with the correct budget', async () => {
            // Arrange
            // Act
            await listener.onExpenseAdded(budgetEvent);

            // Assert
            expect(service.checkBudgetExpenses).toHaveBeenCalledWith(budgetId);
        });
    });
});
