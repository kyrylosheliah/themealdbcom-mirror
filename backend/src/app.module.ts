import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { MealsModule } from 'src/meals/meals.module';

@Module({
  imports: [
    ConfigModule,
    CacheModule.register({
      ttl: 300, // 5 minutes
      max: 1000, // capacity
      isGlobal: true,
    }),
    HttpModule,
    MealsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
