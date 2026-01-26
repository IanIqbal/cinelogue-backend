import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/redis/redis.module';
import { HelpersService } from 'src/helpers/helpers.service';

@Module({
  imports:[ConfigModule, RedisModule],
  controllers: [SeriesController],
  providers: [SeriesService, HelpersService],
})
export class SeriesModule {}
