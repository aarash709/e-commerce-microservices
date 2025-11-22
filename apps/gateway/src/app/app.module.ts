import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KAFKA_SERVICE, TCP_SERVICE } from './constants';
import { AuthController } from './auth/auth.controller';
import { OrderController } from './order/order.controller';
import { ClientConfigService, ClientConfigModule } from '@orderly-platform/common'
import { ProductController } from './product/product.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportJwtGuard } from './auth/guards/jwt.guard';
import { JwtStrategy } from './auth/strategy/JWTStrategy';
import { join } from 'path';
import { RolesGuard } from './auth/guards/roles.guard';

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
    ConfigModule.forRoot({ isGlobal: true, envFilePath: join(process.cwd(), ".env") }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: "7d"
        }
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController, AuthController, OrderController, ProductController],
  providers: [AppService, PassportJwtGuard, RolesGuard, JwtStrategy,
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
