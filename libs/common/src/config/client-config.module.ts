import { Module } from '@nestjs/common';
import { ClientConfigService } from './client-config.service';
import { ConfigModule } from '@nestjs/config'
import { join } from 'path';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: false, envFilePath: join(process.cwd(),".env")
    })],
    controllers: [],
    providers: [ClientConfigService],
    exports: [ClientConfigService],
})
export class ClientConfigModule { }
