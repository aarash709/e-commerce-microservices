import { Body, Controller, Inject, Patch, Post } from '@nestjs/common';
import { KAFKA_SERVICE } from '../constants';
import { ClientKafka } from '@nestjs/microservices';
import { PRODUCT_PATTERNS } from '@orderly-platform/common';
import { UpdateProductDto as ClientUpdateProductDto } from '@orderly-platform/common';
import { CreateProductDto as ClientCreateProductDto } from '@orderly-platform/common';

@Controller('product')
export class ProductController {
    constructor(@Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka) { }

    @Post()
    create(@Body() procutDto: ClientCreateProductDto) {
        this.kafkaClient.emit(PRODUCT_PATTERNS.PRODUCT_CREATE, procutDto)
    }

    @Patch()
    update(@Body() UpdateProductDto: ClientUpdateProductDto) {
        this.kafkaClient.emit(PRODUCT_PATTERNS.PRODUCT_UPDATE, UpdateProductDto)
    }
}
