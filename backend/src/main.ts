import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "http://localhost:5173", credentials: true });

  const configService = app.get(ConfigService);

  const coookieSecret = configService.get<string>('COOKIE_SECRET');
  app.use(cookieParser(coookieSecret));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AI Chat bot SAAS')
    .setDescription('The backend API description for AI Chat bot SAAS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get<number>('PORT');
  await app.listen(port, () =>
    console.log(`Listening server on port: ${port}`),
  );
}
bootstrap();
