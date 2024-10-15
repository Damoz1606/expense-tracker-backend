import { Injectable } from '@nestjs/common';
import { StrategyName } from '../strategies/local.strategy';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard(StrategyName) {
}
