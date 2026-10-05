import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RequestLoggingInterceptor } from './common/interceptors/request-logging.interceptor';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const apiPrefix =
    configService.get<string>('app.apiPrefix') ?? 'api/v1';

  const port =
    configService.get<number>('app.port') ?? 3001;

  /*
   * Global API prefix
   */
  app.setGlobalPrefix(apiPrefix);

  /*
   * Security headers
   */
  app.use(helmet());

  /*
   * CORS
   */
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );
  app.useGlobalInterceptors(
    new RequestLoggingInterceptor(),
  );

  /*
   * Global validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /*
   * Swagger
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('LifeOS API')
    .setDescription(
      'LifeOS Backend API - Personal Agentic AI Platform',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup(
    `${apiPrefix}/docs`,
    app,
    document,
  );

  /*
   * Start server
   */
  await app.listen(port);

  console.log('');
  console.log('========================================');
  console.log('        LifeOS Backend Started          ');
  console.log('========================================');
  console.log(
    `Environment : ${configService.get<string>('app.environment')}`,
  );
  console.log(`Port        : ${port}`);
  console.log(`API         : /${apiPrefix}`);
  console.log(`Swagger     : /${apiPrefix}/docs`);
  console.log('========================================');
  console.log('');
}

bootstrap();