import { TestBed } from "@automock/jest";
import { BudgetActivityService } from "../services/budget-activity.service";
import { BudgetActivityController } from "./budget-activity.controller";
import { mockBudgetActivity } from "../stub/budget-activity.stub";
import { TokenPayload } from "src/auth/token/token.payload";
import { NotFoundException } from "@nestjs/common";

describe('BudgetActivityController', () => {
    let controller: BudgetActivityController;
    let service: jest.Mocked<BudgetActivityService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(BudgetActivityController).compile();

        controller = unit
        service = unitRef.get(BudgetActivityService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findActivity', () => {
        const user: TokenPayload = { sub: 1 };
        const mockedBudget = mockBudgetActivity();

        it('should return an array of budget activities', async () => {
            // Arrange
            service.findMany = jest.fn().mockResolvedValue(mockedBudget);

            // Act
            const result = await controller.findActivity(user);

            // Assert
            expect(result.data).toEqual(mockedBudget);
            expect(service.findMany).toHaveBeenCalledWith(user.sub);
        });

        it('should throw NotFoundException if no activities found', async () => {
            // Arrange
            service.findMany = jest.fn().mockResolvedValue([]);

            // Act & Assert
            await expect(controller.findActivity(user)).rejects.toThrow(NotFoundException);
            expect(service.findMany).toHaveBeenCalledWith(user.sub);
        });
    });

});
