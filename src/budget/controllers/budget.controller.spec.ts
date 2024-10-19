import { BudgetController } from './budget.controller';
import { BudgetService } from '../services/budget.service';
import { TestBed } from '@automock/jest';
import { TokenPayload } from 'src/auth/token/token.payload';
import { BudgetRequest } from '../dto/request/buget.base.dto';
import { Budget } from '../dto/response/budget.base.dto';
import { mockBudgetsWithoutExpenses, mockBudgetWithoutExpenses } from '../stub/budget-without-expense.stub';
import { mockBudget } from '../stub/budget.stub';
import { BudgetWithExpenses } from '../dto/response/budget-with-expenses.dto';

describe('BudgetController', () => {
  let controller: BudgetController;
  let service: jest.Mocked<BudgetService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(BudgetController).compile();

    controller = unit
    service = unitRef.get(BudgetService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const user: TokenPayload = { sub: 1 };
    const budgetRequest: BudgetRequest = { name: 'Test Budget', budget: 1000 };
    const mockedBudget = mockBudgetWithoutExpenses();
    const expectedValue = mockedBudget;

    it('should create a budget', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedBudget);

      // Act
      const result = await controller.create(budgetRequest, user);

      // Assert
      expect(service.create).toHaveBeenCalledWith(user.sub, budgetRequest);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('findMany', () => {
    const user: TokenPayload = { sub: 1 };
    const mockedBudgets: Budget[] = mockBudgetsWithoutExpenses(5);
    const expectedValue = mockedBudgets;

    it('should return an array of budgets', async () => {
      // Arrange
      service.findMany.mockResolvedValue(mockedBudgets);

      // Act
      const result = await controller.findMany(user);

      // Assert
      expect(service.findMany).toHaveBeenCalledWith(user.sub);
      expect(result.data).toEqual(expectedValue);
    });
  });

  describe('findOne', () => {
    const budgetId = 1;
    const mockedBudget: BudgetWithExpenses = mockBudget();
    const expectedValue = mockedBudget;
    it('should return a budget with expenses', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedBudget);

      // Act
      const result = await controller.findOne(budgetId);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(budgetId);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('updateOne', () => {
    const budgetId = 1;
    const budgetRequest: BudgetRequest = { name: 'Updated Budget', budget: 2000 };
    const mockedBudget: Budget = mockBudgetWithoutExpenses();
    const expectedValue = mockedBudget;

    it('should update a budget', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockedBudget);

      // Act
      const result = await controller.updateOne(budgetId, budgetRequest);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(budgetId, budgetRequest);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('deleteOne', () => {
    const budgetId = 1;
    it('should delete a budget', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      await controller.deleteOne(budgetId);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(budgetId);
    });
  });
});
