/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe())

  const config = app.get(ConfigService)

  const port = config.get("PORT")
  console.log(`gatewat port through config is: ${port}`)
  const swaggerConfig = new DocumentBuilder()
    .setTitle("E-COMMERCE API GATEWAY")
    .setVersion("0.0.1-alpha")
    .build()
  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("doc", app, documentFactory)
  app.listen(port)

  Logger.log(
    `🚀 Api gateway is running on: ${port}`
  );
}

bootstrap();
