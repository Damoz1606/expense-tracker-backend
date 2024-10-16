import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import loggerMiddleware from './shared/setup/logger.middleware'
import { ConfigService } from '@nestjs/config';
import { ServerConfig, ServerConfigName } from './shared/config/server.config';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe());
  app.use(loggerMiddleware);

  const logger = app.get(Logger);
  app.useLogger(logger);

  const configService = app.get(ConfigService);
  const serverConfig = configService.getOrThrow<ServerConfig>(ServerConfigName);

  const swaggerOptions = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest-js Expense Tracker')
    .setDescription('API for the expense tracker application')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/docs', app, swaggerDocument);


  await app.listen(serverConfig.port);
  logger.debug(`Running in port: ${serverConfig.port}`);
}
bootstrap();
