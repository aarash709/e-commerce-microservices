import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsInt, IsUUID } from "class-validator"

export class ProcessProductDto {
    @ApiProperty({ description: "UUID of the product", example: "123456789" })
    @IsNotEmpty()
    @IsUUID()
    productId!: string
    @ApiProperty({ description: "Quantity of the product to be subtracted from the inventory", example: 12 })
    @IsNotEmpty()
    @IsInt()
    quantity!: number

}