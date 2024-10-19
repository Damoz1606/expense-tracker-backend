import { TestBed } from "@automock/jest";
import { ExpenseSearchService } from "../services/expense-search.service";
import { ExpenseSearchController } from "./expense-search.controller";
import { TokenPayload } from "src/auth/token/token.payload";
import { CountMetaDto, FilterMetaDto } from "src/shared/dtos/filter.base.dto";
import { mockExpenses } from "../stub/expense.stub";

describe('ExpenseSearchController', () => {
  let controller: ExpenseSearchController;
  let service: jest.Mocked<ExpenseSearchService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExpenseSearchController).compile();

    controller = unit
    service = unitRef.get(ExpenseSearchService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('search', () => {
    const user: TokenPayload = { sub: 1 };
    const filterMeta: FilterMetaDto = { filter: 'test', take: 10, skip: 0, extras: {} };
    const mockedExpenses = mockExpenses();
    const expectedValue = { data: mockedExpenses }

    it('should return an array of expenses', async () => {
      // Arrange
      service.search.mockResolvedValue(mockedExpenses);

      // Act
      const result = await controller.search(filterMeta, user);

      // Assert
      expect(service.search).toHaveBeenCalledWith(
        { filter: 'test' },
        { skip: 0, take: 10 },
        { ...filterMeta.extras, user: user.sub }
      );
      expect(result).toEqual(expectedValue);
    });
  });

  describe('count', () => {
    const user: TokenPayload = { sub: 1 };
    const countMeta: CountMetaDto = { filter: 'test', take: 10, extras: {} };
    const mockedValue = { pages: 5 };
    const expectedValue = mockedValue;

    it('should return the number of pages', async () => {
      // Arrange
      service.count.mockResolvedValue(mockedValue);

      // Act
      const result = await controller.count(countMeta, user);

      // Assert
      expect(service.count).toHaveBeenCalledWith(
        countMeta.take,
        { filter: 'test' },
        { ...countMeta.extras, user: user.sub }
      );
      expect(result).toEqual(expectedValue);
    });
  });
});