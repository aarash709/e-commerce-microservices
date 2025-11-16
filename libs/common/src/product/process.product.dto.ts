import { IsNotEmpty, IsInt, IsUUID } from "class-validator"

export class ProcessProductDto {
    @IsNotEmpty()
    @IsUUID()
    productId!: string
    @IsNotEmpty()
    @IsInt()
    quantity!: number

}