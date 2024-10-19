import { BudgetService } from './budget.service';
import { MailerService } from 'src/mailer/mailer.service';
import { BudgetRepository } from '../repositories/budget.repository';
import { TestBed } from '@automock/jest';
import { BudgetRequest } from '../dto/request/buget.base.dto';
import { mockPrismaBudget, mockPrismaBudgets } from '../stub/prisma-budget.stub';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BudgetService', () => {
  let service: BudgetService;
  let repository: jest.Mocked<BudgetRepository>;
  let mailer: jest.Mocked<MailerService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(BudgetService).compile();

    service = unit;
    repository = unitRef.get(BudgetRepository);
    mailer = unitRef.get(MailerService);
  });

  describe('create', () => {
    const userId = 1;
    const budgetData: BudgetRequest = { name: 'Test Budget', budget: 1000 };
    const mockedBudget = mockPrismaBudget();
    const expectedValue = mockedBudget;

    it('should create a budget successfully', async () => {
      // Arrange
      repository.create.mockResolvedValue(mockedBudget);

      // Act
      const result = await service.create(userId, budgetData);

      // Assert
      expect(repository.create).toHaveBeenCalledWith({ data: { ...budgetData, userId } });
      expect(result).toEqual(expectedValue);
    });

    it('should throw BadRequestException if creation fails', async () => {
      // Arrange
      repository.create.mockResolvedValue(null);

      // Act & Assert
      await expect(service.create(userId, budgetData)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findMany', () => {
    const userId = 1;
    const budgets = mockPrismaBudgets();
    const expectedValue = budgets;

    it('should retrieve all budgets for a user', async () => {
      // Arrange
      repository.findMany.mockResolvedValue(budgets);

      // Act
      const result = await service.findMany(userId);

      // Assert
      expect(repository.findMany).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual(expectedValue);
    });
  });

  describe('findOne', () => {
    const budgetId = 1;
    const mockedBudget = mockPrismaBudget();
    const expectedValue = mockedBudget;

    it('should retrieve a budget with expenses', async () => {
      // Arrange
      repository.findFirst.mockResolvedValue(mockedBudget);

      // Act
      const result = await service.findOne(budgetId);

      // Assert
      expect(repository.findFirst).toHaveBeenCalledWith({
        where: { id: budgetId },
        include: {
          expenses: {
            select: {
              id: true,
              name: true,
              amount: true,
              createAt: true,
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
      await expect(service.findOne(budgetId))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('updateOne', () => {
    const budgetId = 1;
    const updateData = { name: 'Updated Budget' };
    const mockedBudget = mockPrismaBudget();
    const expectedValue = mockedBudget;

    it('should update a budget successfully', async () => {
      // Arrange
      repository.update.mockResolvedValue(mockedBudget);

      // Act
      const result = await service.updateOne(budgetId, updateData);

      // Assert
      expect(repository.update).toHaveBeenCalledWith({
        where: { id: budgetId },
        data: updateData,
      });
      expect(result).toEqual(expectedValue);
    });

    it('should throw NotFoundException if budget is not found', async () => {
      // Arrange
      repository.update.mockResolvedValue(null);

      // Act && Assert
      await expect(service.updateOne(budgetId, updateData)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteOne', () => {
    const budgetId = 1;
    const mockedBudget = mockPrismaBudget();

    it('should delete a budget successfully', async () => {
      // Arrange
      repository.delete.mockResolvedValue(mockedBudget);

      // Act
      const result = await service.deleteOne(budgetId);

      // Assert
      expect(repository.delete).toHaveBeenCalledWith({ where: { id: budgetId } });
      expect(result).toEqual(mockedBudget);
    });

    it('should throw NotFoundException if budget is not found', async () => {
      // Arrange
      const budgetId = 1;

      // Act
      repository.delete.mockResolvedValue(null);

      // Assert
      await expect(service.deleteOne(budgetId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('checkBudgetExpenses', () => {
    const budgetId = 1;
    const mockedBudget = { ...mockPrismaBudget(), user: { email: 'test@email.com' } };

    it('should send an email alert if expenses exceed budget', async () => {
      // Arrange
      repository.findFirst.mockResolvedValue(mockedBudget);

      // Act
      await service.checkBudgetExpenses(budgetId);

      // Assert
      expect(mailer.send).toHaveBeenCalledWith({
        recipients: [{ address: mockedBudget.user.email, name: mockedBudget.user.email }],
        subject: 'Credit Alert',
        text: expect.stringContaining(`There was registered a new expense, that consumes your credit from <b>${mockedBudget.name}</b>`),
      });
    });

    it('should not send an email if expenses do not exceed budget', async () => {
      // Arrange
      repository.findFirst.mockResolvedValue(mockedBudget);

      // Act
      await service.checkBudgetExpenses(budgetId);

      // Assert
      expect(mailer.send).not.toHaveBeenCalled();
    });
  });
});
