import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    total!: number
    @IsNumber()
    @IsOptional()
    status!: OrderStatus
    orders?: OrderItem[]
}

export class OrderItem {
    @IsNotEmpty()
    productId!: string
    @IsNumber()
    @IsNotEmpty()
    price!: number
    @IsNumber()
    @IsNotEmpty()
    quantity!: number
}

export enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPED = "SHIPPED",
    CANCELLED = "CANCELLED",
}
