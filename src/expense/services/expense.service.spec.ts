import { ExpenseService } from './expense.service';
import { TestBed } from '@automock/jest';
import { ExpenseRepository } from '../repositories/expense.repository';
import { ExpenseEventService } from './expense-event.service';
import { ExpenseRequest } from '../dto/request/expense.base.dto';
import { mockPrismaExpense, mockPrismaExpenses } from '../stub/prisma-expense.stub';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let repository: jest.Mocked<{
    create: (...args: any[]) => any,
    findMany: (...args: any[]) => any,
    delete: (...args: any[]) => any,
  }>;
  let event: jest.Mocked<ExpenseEventService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExpenseService).compile();

    service = unit
    repository = unitRef.get(ExpenseRepository as any);
    event = unitRef.get(ExpenseEventService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const expenseRequest: ExpenseRequest = { budget: 1, amount: 100, name: 'Test Expense' };
    const mockedExpense = { ...mockPrismaExpense(), budget: { name: 'Test budget' } };
    const expectedValue = { ...mockedExpense, budget: mockedExpense.budget.name };

    it('should create an expense and return it', async () => {
      // Arrange
      repository.create.mockResolvedValue(mockedExpense);

      // Act
      const result = await service.create(expenseRequest);

      // Assert
      const { budget, ...expenseData } = expenseRequest;
      expect(repository.create).toHaveBeenCalledWith({
        data: { ...expenseData, budgetId: budget },
        select: {
          id: true,
          amount: true,
          createAt: true,
          name: true,
          budgetId: true,
          budget: {
            select: {
              name: true,
            },
          },
        },
      });
      expect(event.emitExpenseCreated).toHaveBeenCalledWith({ budget: 1, amount: 100, name: 'Test Expense' });
      expect(result).toEqual(expectedValue);

    });
  });

  describe('findMany', () => {
    const userId = 1;
    const mockedExpenses = mockPrismaExpenses(5).map(e => ({ ...e, budget: { name: 'Test budget' } }));
    const expectedValue = mockedExpenses.map(e => ({ ...e, budget: e.budget.name }));

    it('should return an array of expenses', async () => {
      // Arrange
      repository.findMany.mockResolvedValue(mockedExpenses);

      // Act
      const result = await service.findMany(userId);

      // Assert
      expect(repository.findMany).toHaveBeenCalledWith({
        where: { budget: { userId: 1 } },
        select: {
          id: true,
          amount: true,
          name: true,
          createAt: true,
          budget: {
            select: { name: true },
          },
        },
        orderBy: { createAt: 'desc' },
      });
      expect(result).toEqual(expectedValue);
    });
  });

  describe('findLatest', () => {
    const userId = 1;
    const take = 3;
    const mockedExpenses = mockPrismaExpenses().map(e => ({ ...e, budget: { name: 'Test budget' } }));
    const expectedValue = mockedExpenses.map(e => ({ ...e, budget: e.budget.name }));

    it('should return the latest expenses', async () => {
      // Arrange
      repository.findMany.mockResolvedValue(mockedExpenses);

      // Act
      const result = await service.findLatest(userId, take);

      // Assert
      expect(repository.findMany).toHaveBeenCalledWith({
        where: { budget: { userId: 1 } },
        select: {
          id: true,
          amount: true,
          name: true,
          createAt: true,
          budget: {
            select: { name: true },
          },
        },
        orderBy: { createAt: 'desc' },
        take,
      });
      expect(result).toEqual(expectedValue);
    });
  });

  describe('deleteOne', () => {
    const id = 1;
    const mockedExpense = { ...mockPrismaExpense(), budget: { name: 'Test budget' } };
    const expectedValue = { ...mockedExpense, budget: mockedExpense.budget.name };

    it('should delete an expense and return it', async () => {
      // Arrange
      repository.delete.mockResolvedValue(mockedExpense);

      // Act
      const result = await service.deleteOne(id);

      // Assert
      expect(repository.delete).toHaveBeenCalledWith({
        where: { id },
        select: {
          id: true,
          amount: true,
          name: true,
          createAt: true,
          budget: {
            select: { name: true },
          },
        },
      });
      expect(result).toEqual(expectedValue);
    });
  });
});
