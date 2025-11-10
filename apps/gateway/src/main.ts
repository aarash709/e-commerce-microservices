/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe())

  const config = app.get(ConfigService)

  const port = config.get("PORT")
  console.log(`gatewat port through config is: ${port}`)

  app.listen(port)

  Logger.log(
    `🚀 Api gateway is running on: ${port}`
  );
}

bootstrap();
