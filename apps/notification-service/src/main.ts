/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const kafkaBrokers = process.env.KAFKA_BROKERS
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [kafkaBrokers],
        },
        consumer: {
          groupId: "notification_consumer_group"
        }
      }
    });
  await app.listen()
  Logger.log(
    `🚀Notification service is listening to kafka`
  );
}

bootstrap();
