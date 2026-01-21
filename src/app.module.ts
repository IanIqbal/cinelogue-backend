import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { SeriesModule } from './series/series.module';
import { GeneralModule } from './general/general.module';
@Module({
  imports: [MoviesModule,ConfigModule.forRoot(), SeriesModule, GeneralModule] ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
