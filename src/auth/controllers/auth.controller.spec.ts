import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { TestBed } from '@automock/jest';
import { TokenRSDto } from '../dto/response/token.dto';
import { plainToInstance } from 'class-transformer';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthController).compile();

    controller = unit;
    service = unitRef.get(AuthService);
  });

  describe('login', () => {
    const userId = 1;
    const accessToken = 'fakeAccessToken';

    it('should return a token on successful login', async () => {
      // Arrange
      service.login.mockResolvedValue(accessToken);

      // Act
      const result = await controller.login(userId);

      // Assert
      expect(service.login).toHaveBeenCalledWith(userId);
      expect(result).toEqual(plainToInstance(TokenRSDto, { access: accessToken }));
    });
  });

  describe('validateNewCredential', () => {
    const key = 'test-key';

    it('should activate the new credential', async () => {
      // Arrange
      await controller.validateNewCredential(key);

      // Act & Assert
      expect(service.activate).toHaveBeenCalledWith(key);
    });
  });
});
