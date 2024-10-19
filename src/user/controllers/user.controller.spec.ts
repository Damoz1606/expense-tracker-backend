import { TestBed } from "@automock/jest";
import { UserService } from "../services/user.service";
import { UserController } from "./user.controller";
import { UserRequest } from "../dto/request/user.base.dto";
import { mockUser } from "../stub/user.stub";
import { User } from "../dto/response/user.base.dto";
import { plainToInstance } from "class-transformer";
import { TokenPayload } from "src/auth/token/token.payload";

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserController).compile();

    controller = unit
    service = unitRef.get(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const userRequest: UserRequest = { email: 'test@example.com', password: 'password123', username: 'test' };
    const mockedUser = mockUser();
    const expectedValue = mockedUser;

    it('should create a user and return it', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedUser);

      // Act
      const result = await controller.create(userRequest);

      // Assert
      expect(service.create).toHaveBeenCalledWith(userRequest);
      expect(result).toEqual(plainToInstance(User, expectedValue));
    });
  });

  describe('findOne', () => {
    const tokenPayload: TokenPayload = { sub: 1 };
    const mockedUser = mockUser();
    const expectedValue = mockedUser;

    it('should return a user by token payload', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedUser);

      // Act
      const result = await controller.findOne(tokenPayload);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(tokenPayload.sub);
      expect(result).toEqual(plainToInstance(User, expectedValue));
    });
  });
});
