import { TestBed } from '@automock/jest';
import { AuthCredentialRepository } from '../repositories/auth.repository';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthValidationService } from './auth-validator.service';
import { mockPrismaAuthCredential } from '../stub/prisma-auth.stub';
import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

describe('AuthValidationService', () => {
    let service: AuthValidationService;
    let repository: jest.Mocked<AuthCredentialRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(AuthValidationService).compile();

        service = unit;
        repository = unitRef.get(AuthCredentialRepository);
    });

    describe('validate', () => {
        const email = 'test@example.com';
        const password = 'password123';
        const mockedCredential = mockPrismaAuthCredential();
        const expectedValue = mockedCredential.userId;

        it('should return userId for valid credentials', async () => {
            // Arrange
            repository.findFirst.mockResolvedValue(mockedCredential);
            const spyBcrypt = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

            // Act
            const result = await service.validate({ email, password });

            // Assert
            expect(repository.findFirst).toHaveBeenCalledWith({ where: { email, status: true } });
            expect(spyBcrypt).toHaveBeenCalledWith(password, mockedCredential.password);
            expect(result).toBe(expectedValue);
        });

        it('should throw NotFoundException if user does not exist', async () => {
            // Arrange
            (repository.findFirst as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(service.validate({ email, password })).rejects.toThrow(NotFoundException);
            expect(repository.findFirst).toHaveBeenCalledWith({ where: { email, status: true } });
        });

        it('should throw UnauthorizedException if password is invalid', async () => {
            // Arrange
            repository.findFirst.mockResolvedValue(mockedCredential);
            const spyBcrypt = jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

            // Act & Assert
            await expect(service.validate({ email, password })).rejects.toThrow(UnauthorizedException);
            expect(repository.findFirst).toHaveBeenCalledWith({ where: { email, status: true } });
            expect(spyBcrypt).toHaveBeenCalledWith(password, mockedCredential.password);
        });
    });
});
