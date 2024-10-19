import { TestBed } from "@automock/jest";
import { ExpenseRepository } from "../repositories/expense.repository";
import { ExpenseSearchService } from "./expense-search.service";
import { PageMeta } from "src/shared/dtos/filter.base.dto";
import { mockPrismaExpenses } from "../stub/prisma-expense.stub";
import { BadRequestException } from "@nestjs/common";

describe('ExpenseSearchService', () => {
    let service: ExpenseSearchService;
    let repository: jest.Mocked<ExpenseRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExpenseSearchService).compile();

        service = unit
        repository = unitRef.get(ExpenseRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    describe('search', () => {
        const filter = 'test';
        const extras = { user: 1 };
        const pageMeta: PageMeta = { skip: 0, take: 10 };

        const mockedExpenses = mockPrismaExpenses(5).map(e => ({ ...e, budget: { name: 'Custom budget' } }));
        const expectedValue = mockedExpenses.map(e => ({ ...e, budget: e.budget.name }));

        it('should return an array of expenses', async () => {
            // Arrange
            repository.findMany.mockResolvedValue(mockedExpenses);
            // Act
            const result = await service.search({ filter }, pageMeta, extras);
            // Assert
            expect(repository.findMany).toHaveBeenCalledWith({
                orderBy: { createAt: 'desc' },
                where: {
                    budget: { userId: extras.user },
                    OR: [
                        { name: { contains: filter, mode: 'insensitive' } },
                        { budget: { name: { contains: filter, mode: 'insensitive' } } },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    createAt: true,
                    budget: { select: { name: true } },
                },
                skip: pageMeta.skip * pageMeta.take,
                take: pageMeta.take,
            });
            expect(result).toEqual(expectedValue);
        });

        it('should throw BadRequestException if user is not provided in extras', async () => {
            // Arrange
            const notUserExtras = {};

            // Act & Assert
            await expect(service.search({ filter }, pageMeta, notUserExtras)).rejects.toThrow(BadRequestException);
        });
    });

    describe('count', () => {
        const filter = 'test';
        const take = 10;
        const extras = { user: 1 };

        it('should return the number of pages based on filter', async () => {
            // Arrange
            repository.count.mockResolvedValue(25);

            // Act
            const result = await service.count(take, { filter }, extras);

            // Assert
            expect(result).toEqual({ pages: 3 });
            expect(repository.count).toHaveBeenCalledWith({
                where: {
                    budget: { userId: extras.user },
                    OR: [
                        { name: { contains: filter, mode: 'insensitive' } },
                        { budget: { name: { contains: filter, mode: 'insensitive' } } },
                    ],
                },
            });
        });

        it('should throw BadRequestException if user is not provided in extras', async () => {
            // Arrange
            const notUserExtras = {};

            // Act & Assert
            await expect(service.count(take, { filter }, notUserExtras)).rejects.toThrow(BadRequestException);
        });
    });

});