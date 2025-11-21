import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: {
        expiresIn: "7d"
      }
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
