import { TestBed } from '@automock/jest';
import { AuthCredentialRepository } from '../repositories/auth.repository';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthValidationService } from './auth-validator.service';
import { mockPrismaAuthCredential } from '../stub/prisma-auth.stub';
import * as bcrypt from 'bcrypt';

describe('AuthValidationService', () => {
    let service: AuthValidationService;
    let repository: jest.Mocked<{ findFirst: (...args: any[]) => any; }>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(AuthValidationService)
            .mock(AuthCredentialRepository)
            .using({
                findFirst: jest.fn()
            })
            .compile();

        service = unit;
        repository = unitRef.get(AuthCredentialRepository as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('validate', () => {
        const email = 'test@example.com';
        const password = 'password123';
        const mockedCredential = mockPrismaAuthCredential();
        const expectedValue = mockedCredential.userId;

        it('should return userId for valid credentials', async () => {
            // Arrange
            repository.findFirst.mockResolvedValue(mockedCredential);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

            // Act
            const result = await service.validate({ email, password });

            // Assert
            expect(repository.findFirst).toHaveBeenCalledWith({ where: { email, status: true } });
            expect(bcrypt.compare).toHaveBeenCalledWith(password, mockedCredential.password);
            expect(result).toBe(expectedValue);
        });

        it('should throw NotFoundException if user does not exist', async () => {
            // Arrange
            repository.findFirst.mockResolvedValue(null);

            // Act & Assert
            await expect(service.validate({ email, password })).rejects.toThrow(NotFoundException);
            expect(repository.findFirst).toHaveBeenCalledWith({ where: { email, status: true } });
        });

        it('should throw UnauthorizedException if password is invalid', async () => {
            // Arrange
            repository.findFirst.mockResolvedValue(mockedCredential);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

            // Act & Assert
            await expect(service.validate({ email, password })).rejects.toThrow(UnauthorizedException);
            expect(repository.findFirst).toHaveBeenCalledWith({ where: { email, status: true } });
            expect(bcrypt.compare).toHaveBeenCalledWith(password, mockedCredential.password);
        });
    });
});
