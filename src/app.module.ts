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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().optional(),
        NODE_ENV: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().min(60).required(),
      }),
      load: [
        authConfig,
        serverConfig,
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
    PrismaModule,
    AuthModule,
    BudgetModule,
    ExpenseModule,
    UserModule
  ]
})
export class AppModule { }
