import { ConfigurableModuleBuilder } from "@nestjs/common";

interface SMTPOptions {
    host: string;
    port: number;
    secure: boolean;
}

interface AuthOptions {
    user: string;
    password: string;
}

interface AppOptions {
    name: string;
    mail: string;
}

export type MailerOptions = SMTPOptions & AuthOptions & AppOptions;

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MailerOptions>({ moduleName: 'Mailer' }).build();