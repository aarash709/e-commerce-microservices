import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
export enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPED = "SHIPPED",
    CANCELLED = "CANCELLED",
}

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    total!: number
    @IsEnum(OrderStatus, { message: "status must be one of PENDING,CONFIRMED,SHIPPED,CANCELLED " })
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

