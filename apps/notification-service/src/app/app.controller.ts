import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern("order.created")
  sendOrderCreatedNotification(@Payload() data) {
    console.log("[NOTIFICATION SERVICE] order.created", data)
  }

  @MessagePattern("product.processed")
  sendProductProsessedNotification(@Payload() data) {
    console.log("[NOTIFICATION SERVICE] sent product.prosessed notification", data)
  }

  @MessagePattern("product.created")
  sendProductCreatedNotification(@Payload() data) {
    console.log("[NOTIFICATION SERVICE] sent product.created notification", data)
  }

  @MessagePattern("product.updated")
  sendProductUpdatedNotification(@Payload() data) {
    console.log("[NOTIFICATION SERVICE] sent product.updated notification", data)
  }
}
