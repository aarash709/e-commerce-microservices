import { Body, Controller, Inject, Post } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { KAFKA_SERVICE } from "../constants.js"
import { CreateOrderDto as ClinetCreateOrderDto, ORDER_PATTERN } from "@orderly-platform/common"
import { CreateOrderDto } from "../dto/createOrderDto.js"

@Controller("order")
export class OrderController {
    constructor(
        @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
    ) { }

    @Post()
    create(@Body() orderDto: CreateOrderDto) {
        console.log("[GATEWAY] order is now beig created", orderDto)
        // const createdOrder = this.
        this.kafkaClient.emit(ORDER_PATTERN.ORDER_CREATE, orderDto)
        return { message: "order sent to order service with kafka", order: orderDto }
    }

}
