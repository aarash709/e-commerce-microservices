import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { join } from 'node:path';

const rmqBrokers = process.env.RMQ_BROKERS;
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICAION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rmqBrokers],
          queue: 'main_queue',
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
