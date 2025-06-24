import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('NESTJS_PORT') || 3000;

  app.enableCors({
    origin: `${configService.get('FRONTEND_DOMAIN')}:${port}` || "http://localhost:5000",
  });

  app.setGlobalPrefix("api/json/v1");

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
