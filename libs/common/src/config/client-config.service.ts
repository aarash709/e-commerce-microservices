import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices'

@Injectable()
export class ClientConfigService {
    constructor(private readonly config: ConfigService) { }

    getGatewayPort() {
        return this.config.get<number>("GATEWAY_PORT");
    }

    get gatewayClientOptions(): ClientOptions {
        return {
            transport: Transport.TCP,
            options: {
                port: this.getGatewayPort()
            }
        }
    }
}
