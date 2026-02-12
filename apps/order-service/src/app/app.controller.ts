import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, ClientRMQ, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto, ORDER_PATTERN } from '@orderly-platform/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka
    @Inject("RMQ_SERVICE") private readonly rmqClient: ClientRMQ
  ) { }

  @MessagePattern(ORDER_PATTERN.ORDER_CREATE)
  async createOrder(@Payload() orderDto: CreateOrderDto) {
    console.log("[ORDER SERVICE] creating order...", orderDto)
    await this.appService.create(orderDto)
    //simutaling payment done and then prosess product + notification
    console.log("[ORDER SERVICE] processing product...", orderDto)
    this.rmqClient.emit(ORDER_PATTERN.ORDER_CREATED, orderDto)
  }
}
