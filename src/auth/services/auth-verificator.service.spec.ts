import { MailerService } from "src/mailer/mailer.service";
import { AuthVerificatorRepository } from "../repositories/auth-verificator.repository";
import { AuthVerificatorService } from "./auth-verificator.service";
import { ConfigService } from "@nestjs/config";
import { TestBed } from "@automock/jest";
import uuid from 'uuid';
import { NotFoundException } from "@nestjs/common";

jest.mock('uuid', () => ({
    v4: jest.fn(),
}));

describe('AuthVerificatorService', () => {
    let service: AuthVerificatorService;
    let repository: jest.Mocked<AuthVerificatorRepository>;
    let mailer: jest.Mocked<MailerService>;
    let config: jest.Mocked<ConfigService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(AuthVerificatorService).compile();

        service = unit;
        repository = unitRef.get(AuthVerificatorRepository);
        mailer = unitRef.get(MailerService);
        config = unitRef.get(ConfigService);
    });

    describe('create', () => {
        const authId = 1;
        const key = 'test-uuid';
        const email = 'test@example.com';
        const authConfig = { emailValidation: 'http://localhost/validate' };

        it('should create a verification key and send an email', async () => {
            // Arrange
            const spyUuid = jest.spyOn(uuid, 'v4').mockReturnValue(key);
            repository.create.mockResolvedValue({ credential: { email } } as any);
            config.get.mockReturnValue(authConfig);
            mailer.send.mockResolvedValue(undefined);

            // Act
            const result = await service.create(authId);

            // Assert
            expect(spyUuid).toHaveBeenCalled();
            expect(repository.create).toHaveBeenCalledWith({
                data: { authCredentialId: authId, key },
                select: {
                    credential: {
                        select: { email: true },
                    },
                },
            });
            expect(mailer.send).toHaveBeenCalledWith({
                subject: 'New account',
                recipients: [{ address: email, name: email }],
                text: expect.stringContaining(`${authConfig.emailValidation}/${key}`),
            });
            expect(result).toBe(true);
        });
    });

    describe('validateCredential', () => {
        const key = 'test-key';
        const authId = 1;

        it('should validate the key and deactivate the credential', async () => {
            // Arrange
            repository.update.mockResolvedValue({ authCredentialId: authId } as any);

            // Act
            const result = await service.validateCredential(key);

            // Assert
            expect(repository.update).toHaveBeenCalledWith({
                where: { key, status: true },
                select: { authCredentialId: true },
                data: { status: false },
            });
            expect(result).toBe(authId);
        });

        it('should throw NotFoundException if key is not found', async () => {
            // Arrange
            repository.update.mockResolvedValue(null);

            // Act & Assert
            await expect(service.validateCredential('invalid-key'))
                .rejects
                .toThrow(NotFoundException);
        });
    });
});