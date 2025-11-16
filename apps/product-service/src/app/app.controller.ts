import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { PRODUCT_PATTERNS, CreateProductDto, UpdateProductDto, ProcessProductDto } from '@orderly-platform/common'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("NOTIFICAION_SERVICE") private readonly kafkaClient: ClientKafka
  ) { }

  @MessagePattern(PRODUCT_PATTERNS.PRODUCT_PROCESS)
  async process(@Payload() processProductDto: ProcessProductDto) {
    const processedProduct = await this.appService.handleOrderCreated(processProductDto)
    //notification
    this.kafkaClient.emit(PRODUCT_PATTERNS.PRODUCT_PROCESSED, processedProduct.name)
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
