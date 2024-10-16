import { Inject, Injectable } from '@nestjs/common';
import { TokenPayload } from '../token/token.payload';
import { JwtService } from '@nestjs/jwt';
import { AuthCredential } from '@prisma/client';
import { AuthCredentialRepository } from '../repositories/auth.repository';
import { hash } from 'bcrypt'

@Injectable()
export class AuthService {

  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(AuthCredentialRepository) private readonly repository: AuthCredentialRepository
  ) { }

  async login(user: number): Promise<string> {
    const tokenPayload = new TokenPayload(user.toFixed.toString());
    const token = this.jwtService.sign({ ...tokenPayload });
    return token;
  }

  async create(data: { email: string, password: string, userId: number }): Promise<Omit<AuthCredential, 'password'>> {
    const password: string = await hash(data.password, 8);
    const auth = await this.repository.create({ data: { ...data, password } });
    return auth;
  }

  verify(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }
}
