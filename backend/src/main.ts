import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const frontend = configService.get("FRONTEND_DOMAIN");

  app.enableCors({
    origin: frontend,
  });

  const port = configService.get("NESTJS_PORT");

  await app.listen(port);
}
bootstrap();
