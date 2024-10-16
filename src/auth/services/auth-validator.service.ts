import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthCredentialRepository } from '../repositories/auth.repository';
import { IValidator } from 'src/shared/interfaces/validation.interface';

@Injectable()
export class AuthValidationService implements IValidator {

    constructor(
        @Inject(AuthCredentialRepository) private readonly repository: AuthCredentialRepository
    ) { }

    async validate({ email, password }: { email: string, password: string }): Promise<number> {
        const user = await this.repository.findFirst({ where: { email: email } });
        if (!user) throw new NotFoundException();
        const validPassword = await compare(password, user.password);
        if (!validPassword) throw new UnauthorizedException();
        return user.userId;
    }
}
