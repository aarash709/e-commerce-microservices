import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  async create(orderDto) {
    console.log("[ORDER SERVICE] order created", orderDto)
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
