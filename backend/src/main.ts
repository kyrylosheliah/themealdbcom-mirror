import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const frontend = configService.get<string>("FRONTEND_DOMAIN") || "";

  app.enableCors({
    origin: frontend,
  });

  const port = configService.get<string>("NESTJS_PORT") || "";

  console.log(`listening at localhost:${port}`);

  await app.listen(port);
}
bootstrap().catch(e => console.log(e));
