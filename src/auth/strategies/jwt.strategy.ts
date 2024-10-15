import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../token/token.payload";
import { AuthConfig, AuthConfigName } from "src/shared/config/auth.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
    constructor(
        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow<AuthConfig>(AuthConfigName).secret
        });
    }

    validate(payload: TokenPayload) {
        return payload;
    }
}