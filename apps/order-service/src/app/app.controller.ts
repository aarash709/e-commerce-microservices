import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto, ORDER_PATTERN, ProcessProductDto, PRODUCT_PATTERNS } from '@orderly-platform/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("KAFKA_SERVICE") private readonly kafkaClient: ClientKafka) { }

  @MessagePattern(ORDER_PATTERN.ORDER_CREATE)
  createOrder(@Payload() orderDto: CreateOrderDto) {
    console.log("[ORDER SERVICE] creating order...", orderDto)
    this.appService.create(orderDto)
    //notification
    this.kafkaClient.emit(ORDER_PATTERN.ORDER_CREATED, orderDto)
    //prosess product
    console.log("[ORDER SERVICE] processing product...", orderDto)
    const order = orderDto.orders[0]
    const processProduct: ProcessProductDto = { productId: order.productId, quantity: order.quantity }
    const productsToProcess = orderDto.orders.map((order) => {
      return order
    })
    this.kafkaClient.emit(PRODUCT_PATTERNS.PRODUCT_PROCESS, processProduct)
  }
}
