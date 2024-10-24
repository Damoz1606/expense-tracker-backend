import { registerAs } from "@nestjs/config";

export const ServerConfigName = 'server';

export interface ServerConfig {
    nodeEnv: string;
    port: number;
    app: string;
}

export default registerAs(ServerConfigName, () => ({
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || '3000')
}));