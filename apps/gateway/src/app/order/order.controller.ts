import { Body, Controller, Inject, Post, Req, UseGuards } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { KAFKA_SERVICE } from "../constants.js"
import { CreateOrderDto as ClinetCreateOrderDto, ORDER_PATTERN } from "@orderly-platform/common"
import { PassportJwtGuard } from "../auth/guards/jwt.guard.js"

@Controller("order")
@UseGuards(PassportJwtGuard)
export class OrderController {
    constructor(
        @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
    ) { }

    @Post()
    create(@Body() orderDto: ClinetCreateOrderDto, @Req() req) {
        console.log("[GATEWAY] order is now beig created", orderDto)
        this.kafkaClient.emit(ORDER_PATTERN.ORDER_CREATE, orderDto)
        return { message: "order sent to order service with kafka", order: orderDto }
    }

}
