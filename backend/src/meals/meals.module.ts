import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';

@Module({
  imports: [HttpModule],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
