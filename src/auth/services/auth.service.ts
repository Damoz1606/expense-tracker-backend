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

  /**
   * Log user by its given credentials
   * @param {number} user - Credentials
   * @returns Token string
   */
  async login(user: number): Promise<string> {
    const tokenPayload = new TokenPayload(user);
    const token = this.jwtService.sign({ ...tokenPayload });
    return token;
  }

  /**
   * Creates credential with the given data
   * @param data - Credentials
   * @returns Credential object ommiting the password
   */
  async create(data: { email: string, password: string, userId: number }): Promise<Omit<AuthCredential, 'password'>> {
    const password: string = await hash(data.password, 8);
    const auth = await this.repository.create({ data: { ...data, password } });
    return auth;
  }

  /**
   * Checks if the given JWT is okay
   * @param {string} token - Access token
   * @returns Token Payload
   */
  verify(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }
}
