import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateOrderDto } from '@orderly-platform/common';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(orderDto: CreateOrderDto) {
    console.log("[ORDER SERVICE] creating order", orderDto)
    return await this.databaseService.order.create({
      data: { total: orderDto.total, status: orderDto.status, orders: { create: orderDto.orders } }, include: { orders: true }
    })
  }
}
