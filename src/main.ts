import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = [
    'http://localhost:3001', 
    'https://cinelogue.id',
    'https://cinelogue.vercel.app'
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if(!origin ) return callback(null, true);
      
      if(allowedOrigins.includes(origin)){
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials:false,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
