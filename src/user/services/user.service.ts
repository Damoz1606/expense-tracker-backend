import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from 'src/auth/services/auth.service';
import { UserRequest } from '../dto/request/user.base.dto';
import { User } from '../dto/response/user.base.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepository) private readonly repository: UserRepository,
        @Inject(AuthService) private readonly authService: AuthService
    ) { }

    /**
     * Creates a user with the given data
     * @param param0 - Data required to create a user
     * @returns User object inside a promise
     */
    async create({ password, ...data }: UserRequest): Promise<User> {
        const user = await this.repository.create({ data });
        await this.authService.create({ email: data.email, password, userId: user.id });
        return user;
    }

    /**
     * Retrives a user by its given identifier
     * @param id - Unique identifier of a user
     * @returns User inside a promise
     */
    async findOne(id: number): Promise<User> {
        return this.repository.findFirst({ where: { id } });
    }
}
