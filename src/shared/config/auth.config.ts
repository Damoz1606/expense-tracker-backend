import { registerAs } from "@nestjs/config";

export const AuthConfigName = 'auth';

export interface AuthConfig {
    emailValidation: string;
    secret: string;
    expiration: number;
}

export default registerAs(AuthConfigName, () => ({
    emailValidation: process.env.EMAIL_VALIDATION,
    secret: process.env.JWT_SECRET,
    expiration: Number(process.env.JWT_EXPIRATION),
}));