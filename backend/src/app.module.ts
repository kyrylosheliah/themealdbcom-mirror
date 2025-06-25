import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { HttpModule } from "@nestjs/axios";
import { MealsModule } from "src/meals/meals.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    CacheModule.register({
      ttl: 3600, // 1 hour
      max: 1000, // capacity
      isGlobal: true,
    }),
    HttpModule,
    MealsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
