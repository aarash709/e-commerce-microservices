import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto, ORDER_PATTERN } from '@orderly-platform/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka) { }

  @MessagePattern(ORDER_PATTERN.ORDER_CREATE)
  createOrder(@Payload() orderDto: CreateOrderDto) {
    console.log("[ORDER SERVICE] creating order...", orderDto)
    this.appService.create(orderDto)
    //simutaling payment done and then prosess product + notification
    console.log("[ORDER SERVICE] processing product...", orderDto)
    this.kafkaClient.emit(ORDER_PATTERN.ORDER_CREATED, orderDto)
  }
}
