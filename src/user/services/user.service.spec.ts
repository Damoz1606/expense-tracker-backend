import { TestBed } from '@automock/jest';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from 'src/auth/services/auth.service';
import { UserRequest } from '../dto/request/user.base.dto';
import { mockPrismaUser } from '../stub/prisma-user.stub';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<{
    create: (...args: any[]) => any,
    findFirst: (...args: any[]) => any
  }>;
  let authService: jest.Mocked<AuthService>;
  
  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    service = unit;
    repository = unitRef.get(UserRepository as any);
    authService = unitRef.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const userRequest: UserRequest = { email: 'test@example.com', password: 'password123', username: 'test' };
    const mockedUser = mockPrismaUser();
    const expectedUser = mockedUser;

    it('should create a user and call auth service', async () => {
      // Arrange
      repository.create.mockResolvedValue(mockedUser);
      authService.create.mockResolvedValue(undefined);

      // Act
      const result = await service.create(userRequest);

      // Assert
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userRepositoryExpected } = userRequest;
      expect(repository.create).toHaveBeenCalledWith({ data: userRepositoryExpected });
      expect(authService.create).toHaveBeenCalledWith({ email: userRequest.email, password: userRequest.password, userId: mockedUser.id });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findOne', () => {
    const userId = 1;
    const mockedUser = mockPrismaUser();
    const expectedUser = mockedUser;

    it('should return a user by id', async () => {
      // Arrange
      repository.findFirst.mockResolvedValue(mockedUser);

      // Act
      const result = await service.findOne(userId);

      // Assert
      expect(repository.findFirst).toHaveBeenCalledWith({ where: { id: userId } });
      expect(result).toEqual(expectedUser);
    });
  });
});
