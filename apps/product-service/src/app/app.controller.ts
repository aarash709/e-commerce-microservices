import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("NOTIFICAION_SERVICE") private readonly kafkaClient: ClientKafka
  ) { }

  @MessagePattern("product.prosess")
  prosess(@Payload() productCreateDto) {
    this.appService.updateProduct({})
    //notification
    this.kafkaClient.emit("product.prosessed", productCreateDto)
  }

  @MessagePattern("product.create")
  create(@Payload() productCreateDto) {
    this.appService.createProduct({ name: "procut name", price: 123, stock: 14 })
    //notification
    this.kafkaClient.emit("product.created", productCreateDto)
  }

  @MessagePattern("product.update")
  update(@Payload() updateProductDto) {
    this.kafkaClient.emit("product.updated", updateProductDto)
  }
}
