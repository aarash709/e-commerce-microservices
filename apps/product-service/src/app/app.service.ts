import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateOrderDto, CreateProductDto, UpdateProductDto } from '@orderly-platform/common';

@Injectable()
export class AppService {
  constructor(private readonly database: DatabaseService) { }

  async createProduct(createProductDto: CreateProductDto) {
    const data = await this.database.product.create({
      data: createProductDto
    })
    console.log("[PRODUCT SERVICE] product created: ", data)
  }
  async updateProduct(updateProductDto: UpdateProductDto) {
    const updatedData = await this.database.product.update({
      where: { sku: updateProductDto.sku },
      data: updateProductDto
    })
    console.log("[PRODUCT SERVICE] product updated: ", updatedData)
  }
  //fires after a simulated payment
  async handleProcessProducts(orderDto: CreateOrderDto) {
    console.log("[PRODUCT_SERVICE] processing products...")
    return this.database.$transaction(
      orderDto.orders.map((order) =>
        this.database.product.update({
          where: { id: order.productId },
          data: { stock: { decrement: order.quantity } }
        })
      )
    );
  }

}
