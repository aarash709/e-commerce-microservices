import { Module } from '@nestjs/common';
import { ClientConfigService } from './client-config.service';
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: false, envFilePath: ".env"
    })],
    controllers: [],
    providers: [ClientConfigService],
    exports: [ClientConfigService],
})
export class ConfigurationModule { }
