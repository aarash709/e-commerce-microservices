import { Body, Controller, Inject, Post } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { KAFKA_SERVICE } from "../constants.js"

@Controller("order")
export class OrderController {
    constructor(
        @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
    ) { }

    @Post()
    create(@Body() orderDto) {
        console.log("[GATEWAY] order is now beig created", orderDto)
        this.kafkaClient.emit("order.create", orderDto)
        return { message: "order sent to order service with kafka", order: orderDto }
    }

}
