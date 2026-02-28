"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const local_upload_config_1 = require("./files/local-upload.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = Number(process.env.PORT ?? 3000);
    (0, local_upload_config_1.ensureUploadDirectories)();
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.setGlobalPrefix('api');
    app.useStaticAssets(local_upload_config_1.LOCAL_UPLOAD_ROOT, { prefix: '/uploads/' });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Edupon API')
        .setDescription('Backend API documentation')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Provide JWT access token in the Authorization header as: Bearer <token>',
    }, 'bearer')
        .addSecurityRequirements('bearer')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const server = await app.listen(port);
    server.requestTimeout = 60_000;
    server.headersTimeout = 65_000;
}
bootstrap();
//# sourceMappingURL=main.js.map