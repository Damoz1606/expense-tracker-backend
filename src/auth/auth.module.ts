import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenFactory } from './token/token.factory';
import { AuthValidationService } from './services/auth-validator.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthCredentialRepository } from './repositories/auth.repository';
import { VALIDATOR } from 'src/shared/constants/injection-token';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: TokenFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthCredentialRepository,
    AuthService,
    {
      provide: VALIDATOR,
      useClass: AuthValidationService
    },
    LocalStrategy,
    JwtStrategy
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule { }
