import { registerAs } from "@nestjs/config";

export const SmtpConfigName = 'smtp';

export interface SmtpConfig {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
    appName: string;
    appMail: string;
}

export default registerAs(SmtpConfigName, () => ({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 3000,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    appName: process.env.SMTP_APP_NAME,
    appMail: process.env.SMTP_APP_MAIL,
}));