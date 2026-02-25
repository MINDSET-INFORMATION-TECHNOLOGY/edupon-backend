import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // apply validation globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // set a global prefix so all routes are under /api
  app.setGlobalPrefix('api');

  // Swagger / OpenAPI setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Edupon API')
    .setDescription('Backend API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
