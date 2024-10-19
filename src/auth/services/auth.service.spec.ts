import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthCredentialRepository } from "../repositories/auth.repository";
import { AuthVerificatorService } from "./auth-verificator.service";
import { TestBed } from "@automock/jest";
import { TokenPayload } from "../token/token.payload";
import * as bcrypt from 'bcrypt'
import { mockAuthCredential } from "../stub/auth.stub";

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: jest.Mocked<JwtService>;
  let repository: jest.Mocked<{
    create: (...args: any[]) => any,
    update: (...args: any[]) => any
  }>;
  let verificatorService: jest.Mocked<AuthVerificatorService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    service = unit;
    jwtService = unitRef.get(JwtService);
    repository = unitRef.get(AuthCredentialRepository as any);
    verificatorService = unitRef.get(AuthVerificatorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const userId = 1;
    const token = 'test-token';
    const tokenPayload = new TokenPayload(userId);

    it('should sign a token with the user payload', async () => {
      // Arrange
      jwtService.sign.mockReturnValue(token);

      // Act
      const result = await service.login(userId);

      // Assert
      expect(jwtService.sign).toHaveBeenCalledWith({ ...tokenPayload });
      expect(result).toBe(token);
    });
  });

  describe('create', () => {
    const data = { email: 'test@example.com', password: 'password123', userId: 1 };
    const hashedPassword: string = 'hashed-password';
    const mockedAuth = mockAuthCredential();
    const expectedValue = mockedAuth;

    it('should hash the password and create a new credential', async () => {
      // Arrange
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      repository.create.mockResolvedValue(mockedAuth);
      verificatorService.create.mockResolvedValue(undefined);

      // Act
      const result = await service.create(data);

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledWith(data.password, 8);
      expect(repository.create).toHaveBeenCalledWith({ data: { ...data, password: hashedPassword } });
      expect(verificatorService.create).toHaveBeenCalledWith(mockedAuth.id);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('activate', () => {
    const key = 'activation-key';
    const authId = 1;

    it('should validate the credential and update its status', async () => {
      // Arrange
      verificatorService.validateCredential.mockResolvedValue(authId);
      repository.update.mockResolvedValue(undefined);

      // Act
      await service.activate(key);

      // Assert
      expect(verificatorService.validateCredential).toHaveBeenCalledWith(key);
      expect(repository.update).toHaveBeenCalledWith({ where: { id: authId }, data: { status: true } });
    });
  });

  describe('verify', () => {
    const token = 'jwt-token';
    const payload = new TokenPayload(1);

    it('should verify the token and return the payload', () => {
      // Arrange
      jwtService.verify.mockReturnValue(payload);

      // Act
      const result = service.verify(token);

      // Assert
      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(result).toEqual(payload);
    });
  });
});