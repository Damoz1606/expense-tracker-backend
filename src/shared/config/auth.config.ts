import { registerAs } from "@nestjs/config";

export const AuthConfigName = 'auth';

export interface AuthConfig {
    secret: string;
    expiration: number;
}

export default registerAs(AuthConfigName, () => ({
    secret: process.env.JWT_SECRET,
    expiration: Number(process.env.JWT_EXPIRATION),
}));