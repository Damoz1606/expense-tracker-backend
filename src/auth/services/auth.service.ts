import { Inject, Injectable } from '@nestjs/common';
import { TokenPayload } from '../token/token.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) { }

  async login(user: number): Promise<string> {
    const tokenPayload = new TokenPayload(user.toFixed.toString());
    const token = this.jwtService.sign({ ...tokenPayload });
    return token;
  }

  verify(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }
}
