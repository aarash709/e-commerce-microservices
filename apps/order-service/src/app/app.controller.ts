import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from '../dto/createOrderDto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka) { }

  @MessagePattern("order.create")
  createOrder(@Payload() orderDto: CreateOrderDto) {
    console.log("[ORDER SERVICE] recieved order.created", orderDto)
    this.appService.create(orderDto)
    //notification
    this.kafkaClient.emit("order.created", orderDto)
    //prosess product
    this.kafkaClient.emit("product.prosess", orderDto)
  }
}
