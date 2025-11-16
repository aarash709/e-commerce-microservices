import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { PRODUCT_PATTERNS, CreateProductDto, UpdateProductDto, CreateOrderDto, ORDER_PATTERN } from '@orderly-platform/common'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("NOTIFICAION_SERVICE") private readonly kafkaClient: ClientKafka
  ) { }

  @MessagePattern(ORDER_PATTERN.ORDER_CREATED)
  async process(@Payload() orderDto: CreateOrderDto) {
    const processedProducts = await this.appService.handleProcessProducts(orderDto)
    //notification
    this.kafkaClient.emit(PRODUCT_PATTERNS.PRODUCT_PROCESSED, processedProducts)
  }

  @MessagePattern(PRODUCT_PATTERNS.PRODUCT_CREATE)
  create(@Payload() productCreateDto: CreateProductDto) {
    this.appService.createProduct(productCreateDto)
    //notification
    this.kafkaClient.emit(PRODUCT_PATTERNS.PRODUCT_CREATED, productCreateDto)
  }

  @MessagePattern(PRODUCT_PATTERNS.PRODUCT_UPDATE)
  update(@Payload() updateProductDto: UpdateProductDto) {
    this.kafkaClient.emit(PRODUCT_PATTERNS.PRODUCT_UPDATED, updateProductDto)
  }
}
