import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { WinstonAppLogger } from './common/logger/winston.logger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV || 'development',
    });
  }

  const customLogger = new WinstonAppLogger();

  const app = await NestFactory.create(AppModule, {
    logger: customLogger,
    cors: {
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('Campus Arena API')
    .setDescription(
      'Web Technologies (CSE) - Campus Sports, Cultural & Facility Management REST & GraphQL Services',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  customLogger.log(`🚀 Campus Arena Backend running at http://localhost:${port}`, 'Bootstrap');
  customLogger.log(`📖 Swagger REST Documentation at http://localhost:${port}/api/docs`, 'Bootstrap');
  customLogger.log(`✨ GraphQL Apollo Playground at http://localhost:${port}/graphql`, 'Bootstrap');
  customLogger.log(`🩺 Health & Observability Metrics at http://localhost:${port}/health`, 'Bootstrap');
}

bootstrap();
