import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AuthVerificatorRepository } from "../repositories/auth-verificator.repository";
import { v4 } from 'uuid'
import { MailerService } from "src/mailer/mailer.service";
import { ConfigService } from "@nestjs/config";
import { AuthConfig, AuthConfigName } from "src/shared/config/auth.config";

@Injectable()
export class AuthVerificatorService {
    constructor(
        @Inject(AuthVerificatorRepository) private readonly repository: AuthVerificatorRepository,
        @Inject(MailerService) private readonly mailer: MailerService,
        @Inject(ConfigService) private readonly config: ConfigService
    ) { }

    /**
     * Creates a verificator key and send it to registered email
     * @param auth 
     * @returns 
     */
    async create(auth: number): Promise<boolean> {
        const key: string = v4();
        const data = await this.repository.create({
            data: { authCredentialId: auth, key },
            select: {
                credential: {
                    select: {
                        email: true
                    }
                }
            }
        });

        await this.mailer.send({
            subject: "New account",
            recipients: [{
                address: data.credential.email,
                name: data.credential.email
            }],
            text: `Hi,\n\n
            Welcome to the Expense Tracker application. To start using the app please click the link below.\n\n
            ${this.config.get<AuthConfig>(AuthConfigName).emailValidation}/${key}\n\n
            Best regards.`
        })

        return true;
    }

    /**
     * Validates a key, if it exists activate the credentials
     * @param key 
     * @returns Unique identifier of credentials
     */
    async validateCredential(key: string): Promise<number> {
        const value = await this.repository.update({
            where: {
                key: key,
                status: true
            },
            select: {
                authCredentialId: true
            },
            data: {
                status: false
            }
        });
        if (!value) throw new NotFoundException();
        return value.authCredentialId;
    }
}