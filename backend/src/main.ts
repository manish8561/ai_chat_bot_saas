import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const origin = configService.get<string>('ORIGIN') || 'http://localhost:5173';
  app.enableCors({ origin, credentials: true });

  const coookieSecret = configService.get<string>('COOKIE_SECRET');
  app.use(cookieParser(coookieSecret));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AI Chat Bot SAAS')
    .setDescription('The backend API description for AI Chat Bot SAAS')
    .setVersion('1.0.1')
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
