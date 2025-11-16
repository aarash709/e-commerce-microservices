import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
const kafkaBrokers = process.env.KAFKA_BROKERS
@Module({
  imports: [ClientsModule.register([
    {
      name: "NOTIFICAION_SERVICE",
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [kafkaBrokers]
        }
      }
    }
  ]), ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true,
  }), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
