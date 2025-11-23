import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator'
export enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPED = "SHIPPED",
    CANCELLED = "CANCELLED",
}
import { ApiProperty } from '@nestjs/swagger'
export class OrderItem {
    @ApiProperty({ description: "UUID of the order item", example: "123456789" })
    @IsNotEmpty()
    productId!: string
    @ApiProperty({ description: "Price of this order item", example: 100 })
    @IsNumber()
    @IsNotEmpty()
    price!: number
    @ApiProperty({ description: "Quantity of this order item", example: 15 })
    @IsNumber()
    @IsNotEmpty()
    quantity!: number
}
export class CreateOrderDto {
    @ApiProperty({ description: "Total number of the orders", example: 10 })
    @IsNumber()
    @IsNotEmpty()
    total!: number
    @ApiProperty({ description: "Current status of the order", enum: OrderStatus, example: "PENDING" })
    @IsEnum(OrderStatus, { message: "status must be one of PENDING,CONFIRMED,SHIPPED,CANCELLED " })
    status!: OrderStatus
    @ApiProperty({ description: "Actual order items in one order being placed", type: [OrderItem], example: OrderItem })
    orders?: OrderItem[]
}



