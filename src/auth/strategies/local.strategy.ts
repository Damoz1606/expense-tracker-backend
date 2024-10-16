import { Injectable, Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from "passport-local";
import { IValidator } from "src/shared/interfaces/validation.interface";
import { VALIDATOR } from "src/shared/constants/injection-token";

export const StrategyName: string = 'local-strategy';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, StrategyName) {
    constructor(
        @Inject(VALIDATOR) private readonly validator: IValidator
    ) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string) {
        try {
            return this.validator.validate({ email, password });
        } catch (error) {
            if (error instanceof NotFoundException) throw new UnauthorizedException();
            throw error;
        }
    }
}