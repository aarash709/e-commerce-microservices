import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { KAFKA_SERVICE } from "../constants.js"
import { CreateOrderDto as ClinetCreateOrderDto, ORDER_PATTERN } from "@orderly-platform/common"
import { PassportJwtGuard } from "../auth/guards/jwt.guard.js"
import { ConfigService } from "@nestjs/config"
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger"

@ApiBearerAuth()
@Controller("order")
@UseGuards(PassportJwtGuard)
export class OrderController {
    constructor(
        @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
        private readonly config: ConfigService
    ) { }

    @ApiOperation({ description: "Creates a new order with order items" })
    @ApiOkResponse({ description: "The order has been creted successfully!", type: ClinetCreateOrderDto })
    @ApiBadRequestResponse({ description: "Invalid input!" })
    @ApiUnauthorizedResponse({ description: "Unauthorized access!" })
    @Post()
    create(@Body() orderDto: ClinetCreateOrderDto) {
        console.log("[GATEWAY] order is now beig created", orderDto)
        this.kafkaClient.emit(ORDER_PATTERN.ORDER_CREATE, orderDto)
        return { message: "order sent to order service with kafka", order: orderDto }
    }

}
