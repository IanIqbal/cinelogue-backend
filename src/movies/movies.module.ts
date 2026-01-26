import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ConfigModule } from '@nestjs/config';
import { HelpersService } from 'src/helpers/helpers.service';
import { RedisModule } from 'src/redis/redis.module';
@Module({
  imports: [ConfigModule, RedisModule],
  controllers: [MoviesController],
  providers: [MoviesService, HelpersService],
})
export class MoviesModule {}
