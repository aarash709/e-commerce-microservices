import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { join } from 'path';
// const kafkaBrokers = process.env.KAFKA_BROKERS;
const rmqBrokers = process.env.RMQ_BROKERS;
@Module({
  imports: [
    ClientsModule.register([
      // {
      //   name: "KAFKA_SERVICE",
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       brokers: [kafkaBrokers]
      //     }
      //   }
      // }
      {
        name: 'RMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rmqBrokers],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '.env'),
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
