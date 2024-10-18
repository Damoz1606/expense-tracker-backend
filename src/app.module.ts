import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino'
import authConfig from './shared/config/auth.config';
import serverConfig, { ServerConfig, ServerConfigName } from './shared/config/server.config';
import { AuthModule } from './auth/auth.module';
import { BudgetModule } from './budget/budget.module';
import { ExpenseModule } from './expense/expense.module';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
import smtpConfig, { SmtpConfig, SmtpConfigName } from './shared/config/smtp.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().optional(),
        NODE_ENV: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().min(60).required(),
        SMTP_HOST: Joi.string().required(),
        SMTP_PORT: Joi.number().required(),
        SMTP_SECURE: Joi.boolean().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASSWORD: Joi.string().required(),
        SMTP_APP_NAME: Joi.string().required(),
        SMTP_APP_MAIL: Joi.string().required(),
      }),
      load: [
        authConfig,
        serverConfig,
        smtpConfig
      ]
    }),
    LoggerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const server = config.getOrThrow<ServerConfig>(ServerConfigName);
        const isProduction = server.nodeEnv === 'production';

        return {
          pinoHttp: {
            transport: isProduction ? undefined : {
              target: 'pino-pretty',
              options: {
                singleLine: true
              }
            },
            level: isProduction ? 'info' : 'debug'
          }
        }
      },
      inject: [ConfigService]
    }),
    MailerModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        host: config.get<SmtpConfig>(SmtpConfigName).host,
        port: config.get<SmtpConfig>(SmtpConfigName).port,
        secure: config.get<SmtpConfig>(SmtpConfigName).secure,
        user: config.get<SmtpConfig>(SmtpConfigName).user,
        password: config.get<SmtpConfig>(SmtpConfigName).password,
        name: config.get<SmtpConfig>(SmtpConfigName).appName,
        mail: config.get<SmtpConfig>(SmtpConfigName).appMail,
      })
    }),
    PrismaModule,
    AuthModule,
    BudgetModule,
    ExpenseModule,
    UserModule,
  ]
})
export class AppModule { }
