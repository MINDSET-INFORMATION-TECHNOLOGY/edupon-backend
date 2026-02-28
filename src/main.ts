import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ensureUploadDirectories,
  LOCAL_UPLOAD_ROOT,
} from './files/local-upload.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = Number(process.env.PORT ?? 3000);
  ensureUploadDirectories();

  // apply validation globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // set a global prefix so all routes are under /api
  app.setGlobalPrefix('api');
  app.useStaticAssets(LOCAL_UPLOAD_ROOT, { prefix: '/public/' });

  // Swagger / OpenAPI setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Edupon API')
    .setDescription('Backend API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Provide JWT access token in the Authorization header as: Bearer <token>',
      },
      'bearer',
    )
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const server = await app.listen(port);
  server.requestTimeout = 60_000;
  server.headersTimeout = 65_000;
}
bootstrap();
