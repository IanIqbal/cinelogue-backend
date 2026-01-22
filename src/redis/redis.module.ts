import { Module } from '@nestjs/common';
import { Redis } from '@upstash/redis';
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {
                return new Redis({
                    url: process.env.REDIS_REST_URL,
                    token: process.env.REDIS_REST_TOKEN
                });
            }
        }
    ],
    exports: ['REDIS_CLIENT']
})
export class RedisModule {}
