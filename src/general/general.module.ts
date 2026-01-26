import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports:[ConfigModule],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule {}
