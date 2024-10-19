import { BudgetRepository } from '../repositories/budget.repository';
import { TestBed } from '@automock/jest';
import { BudgetActivityService } from './budget-activity.service';
import { mockPrismaBudget, mockPrismaBudgets } from '../stub/prisma-budget.stub';
import { BudgetActivity } from '../dto/response/budget-activity.dto';
import { mockExpenses } from 'src/expense/stub/expense.stub';
import { NotFoundException } from '@nestjs/common';

describe('BudgetActivityService', () => {
    let service: BudgetActivityService;
    let repository: jest.Mocked<BudgetRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(BudgetActivityService).compile();

        service = unit;
        repository = unitRef.get(BudgetRepository);
    });

    describe('findOne', () => {
        const budgetId = 1;
        const mockedBudget = { ...mockPrismaBudget(), expenses: mockExpenses(5) };
        const expectedValue: BudgetActivity = {
            ...mockedBudget,
            items: mockedBudget.expenses.length,
            spend: mockedBudget.expenses.reduce((prev, curr) => prev + curr.amount, 0)
        }

        it('should return budget activity for a valid budget id', async () => {
            // Arrange
            repository.findFirst.mockResolvedValue(mockedBudget);

            // Act
            const result = await service.findOne(budgetId);

            // Assert
            expect(repository.findFirst).toHaveBeenCalledWith({
                where: { id: budgetId },
                select: {
                    id: true,
                    name: true,
                    budget: true,
                    expenses: {
                        select: {
                            amount: true,
                        },
                    },
                },
            });
            expect(result).toEqual(expectedValue);
        });

        it('should throw NotFoundException if budget is not found', async () => {
            // Arrange
            const budgetId = 1;

            // Act
            repository.findFirst.mockResolvedValue(null);

            // Assert
            await expect(service.findOne(budgetId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findMany', () => {
        const userId = 1;
        const mockedBudget = mockPrismaBudgets(5).map(e => ({ ...e, expenses: mockExpenses(5) }));
        const expectedValue: BudgetActivity[] = mockedBudget.map(e => ({
            ...e,
            items: e.expenses.length,
            spend: e.expenses.reduce((prev, curr) => prev + curr.amount, 0)
        }))

        it('should return array of budget activities for a user', async () => {
            repository.findMany.mockResolvedValue(mockedBudget);

            const result = await service.findMany(userId);

            expect(repository.findMany).toHaveBeenCalledWith({
                where: { userId },
                select: {
                    id: true,
                    name: true,
                    budget: true,
                    expenses: {
                        select: {
                            amount: true,
                        },
                    },
                },
            });

            expect(result).toEqual(expectedValue);
        });
    });

});