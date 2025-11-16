import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ORDER_PATTERN, PRODUCT_PATTERNS } from '@orderly-platform/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern(ORDER_PATTERN.ORDER_CREATED)
  sendOrderCreatedNotification(@Payload() data) {
    console.log("[NOTIFICATION SERVICE] order.created", data)
  }

  @MessagePattern(PRODUCT_PATTERNS.PRODUCT_PROCESSED)
  sendProductProsessedNotification(@Payload() data) {
    console.log("[NOTIFICATION SERVICE] product prosessed", data)
  }

  @MessagePattern(PRODUCT_PATTERNS.PRODUCT_CREATED)
  sendProductCreatedNotification(@Payload() data) {
    console.log("[NOTIFICATION SERVICE] sent product.created notification", data)
  }

  @MessagePattern(PRODUCT_PATTERNS.PRODUCT_UPDATED)
  sendProductUpdatedNotification(@Payload() data) {
    console.log("[NOTIFICATION SERVICE] sent product.updated notification", data)
  }
}
