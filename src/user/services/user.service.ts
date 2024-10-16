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

    async create(data: UserRequest): Promise<User> {
        const user = await this.repository.create({ data });
        await this.authService.create({ ...data, userId: user.id });
        return user;
    }

    async findOne(id: number): Promise<User> {
        return this.repository.findFirst({ where: { id } });
    }
}
