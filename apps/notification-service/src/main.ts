/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const rmqBrokers = process.env.RMQ_BROKERS;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqBrokers],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  Logger.log(`🚀Notification service is listening to RMQ`);
} 

bootstrap();
