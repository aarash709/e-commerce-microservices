import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto, ProcessProductDto, UpdateProductDto } from '@orderly-platform/common';

@Injectable()
export class AppService {
  constructor(private readonly database: DatabaseService) { }

  async createProduct(createProductDto: CreateProductDto) {
    this.database.product.create({
      data: createProductDto
    })
    console.log("[PRODUCT SERVICE] product created")
  }
  async updateProduct(updateProductDto: UpdateProductDto) {
    this.database.product.update({
      where: { sku: updateProductDto.sku },
      data: updateProductDto
    })
    console.log("[PRODUCT SERVICE] product updated")
  }
  //fires after a simulated payment
  async handleOrderCreated(processProductDto: ProcessProductDto) {
    return this.database.product.update({
      where: { id: processProductDto.productId },
      data: { stock: { decrement: processProductDto.quantity } }
    })
  }
}
