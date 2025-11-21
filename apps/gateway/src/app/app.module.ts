import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { KAFKA_SERVICE, TCP_SERVICE } from './constants';
import { AuthController } from './auth/auth.controller';
import { OrderController } from './order/order.controller';
import { ClientConfigService, ClientConfigModule } from '@orderly-platform/common'
import { ProductController } from './product/product.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportJwtGuard } from './auth/guards/jwt.guard';
import { JwtStrategy } from './auth/strategy/JWTStrategy';

const kafkaBrokers = process.env.KAFKA_BROKERS

@Module({
  imports: [
    ClientConfigModule,
    ClientsModule.register([
      {
        name: KAFKA_SERVICE, transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [kafkaBrokers]
          }
        }
      },
    ],
    ),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: "7d" }
    })
  ],
  controllers: [AppController, AuthController, OrderController, ProductController],
  providers: [AppService, PassportJwtGuard, JwtStrategy,
    {
      provide: TCP_SERVICE,
      inject: [ClientConfigService],
      useFactory: (config: ClientConfigService) => {
        const gatewayOptions = config.gatewayClientOptions;
        return ClientProxyFactory.create(gatewayOptions)
      }
    }
  ],
})
export class AppModule { }
