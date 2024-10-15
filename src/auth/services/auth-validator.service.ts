import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthCredentialRepository } from '../repository/auth.repository';

@Injectable()
export class AuthValidationService {

    constructor(
        @Inject(AuthCredentialRepository) private readonly repository: AuthCredentialRepository
    ) { }

    async validate(email: string, password: string): Promise<number> {
        const user = await this.repository.findFirst({ where: { email: email } });
        if (!user) throw new NotFoundException();
        const validPassword = await compare(password, user.password);
        if (!validPassword) throw new UnauthorizedException();
        return user.userId;
    }
}
