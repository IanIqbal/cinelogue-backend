import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { SeriesModule } from './series/series.module';
@Module({
  imports: [MoviesModule,ConfigModule.forRoot(), SeriesModule] ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
