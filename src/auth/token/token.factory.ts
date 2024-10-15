import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtOptionsFactory, JwtModuleOptions } from "@nestjs/jwt";
import { AuthConfig, AuthConfigName } from "src/shared/config/auth.config";

@Injectable()
export class TokenFactory implements JwtOptionsFactory {

    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService
    ) { }

    async createJwtOptions(): Promise<JwtModuleOptions> {
        const authConfig = this.configService.getOrThrow<AuthConfig>(AuthConfigName);

        const secret = authConfig.secret;
        const expiresIn = authConfig.expiration;

        return {
            secret,
            signOptions: {
                // algorithm: 'RS256',
                expiresIn
            }
        }
    }
}