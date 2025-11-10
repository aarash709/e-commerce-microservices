import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { KAFKA_SERVICE, TCP_SERVICE } from './constants';
import { AuthController } from './auth/auth.controller';
import { OrderController } from './order/order.controller';

const kafkaBrokers = process.env.KAFKA_BROKERS

@Module({
  imports: [ClientsModule.register([
    {
      name: KAFKA_SERVICE, transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [kafkaBrokers]
        }
      }
    }, {
      name: TCP_SERVICE,
      transport: Transport.TCP,
      options: {
        port: 4001,
      }
    }]), ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })],
  controllers: [AppController, AuthController, OrderController],
  providers: [AppService,
    // {
    //   provide: TCP_SERVICE,
    //   useFactory: (config: ClientConfigService) => {
    //     const gatewayOptions = config.gatewayClientOptions;
    //     return ClientProxyFactory.create(gatewayOptions)
    //   }
    // }
  ],
})
export class AppModule { }
