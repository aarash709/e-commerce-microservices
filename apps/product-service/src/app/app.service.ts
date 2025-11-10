import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  async createProduct(createProductDto) {
    console.log("[PRODUCT SERVICE] product create")
  }
  async updateProduct(updateProductDto) {
    console.log("[PRODUCT SERVICE] product processed")
  }
}
