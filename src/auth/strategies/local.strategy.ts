import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-local";
import { AuthValidationService } from "../services/auth-validator.service";

export const StrategyName: string = 'local-strategy';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, StrategyName) {
    constructor(
        private readonly validator: AuthValidationService
    ) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string) {
        try {
            return this.validator.validate(email, password);
        } catch (error) {
            if (error instanceof NotFoundException) throw new UnauthorizedException();
            throw error;
        }
    }
}