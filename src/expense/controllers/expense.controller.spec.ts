import { TestBed } from "@automock/jest";
import { ExpenseService } from "../services/expense.service";
import { ExpenseController } from "./expense.controller";
import { Expense } from "../dto/response/expense.base.dto";
import { ExpenseRequest } from "../dto/request/expense.base.dto";
import { mockExpense, mockExpenses } from "../stub/expense.stub";
import { TokenPayload } from "src/auth/token/token.payload";

describe('ExpenseController', () => {
  let controller: ExpenseController;
  let service: jest.Mocked<ExpenseService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExpenseController).compile();

    controller = unit
    service = unitRef.get(ExpenseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const expenseRequest: ExpenseRequest = { budget: 1, name: 'Test Expense', amount: 100 };
    const mockedExpense: Expense = mockExpense();
    const expectedValue = mockedExpense;

    it('should create a new expense', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedExpense);

      // Act
      const result = await controller.create(expenseRequest);

      // Assert
      expect(service.create).toHaveBeenCalledWith(expenseRequest);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('findMany', () => {
    const user: TokenPayload = { sub: 1 };
    const mockedExpenses = mockExpenses(5);
    const expectedValue = { data: mockedExpenses };

    it('should return an array of expenses', async () => {
      // Arrange
      service.findMany.mockResolvedValue(mockedExpenses);

      // Act
      const result = await controller.findMany(user);

      // Assert
      expect(service.findMany).toHaveBeenCalledWith(user.sub);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('findLatest', () => {
    it('should return the latest expenses', async () => {
      // Arrange
      const user: TokenPayload = { sub: 1 };
      const mockedExpenses = mockExpenses(5);
      const expectedValue = { data: mockedExpenses };

      service.findLatest.mockResolvedValue(mockedExpenses);

      // Act
      const result = await controller.findLatest(user);

      // Assert
      expect(service.findLatest).toHaveBeenCalledWith(user.sub);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('remove', () => {
    it('should delete an expense', async () => {
      // Arrange
      const expenseId = 1;

      // Act
      await controller.remove(expenseId);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(expenseId);
    });
  });
});