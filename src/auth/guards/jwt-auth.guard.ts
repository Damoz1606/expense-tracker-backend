import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyName } from '../strategies/jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategyName) { }