import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    sku: string
    @IsOptional()
    @IsString()
    description?: string
    @IsNotEmpty()
    @IsDecimal()
    price: string
    @IsNotEmpty()
    @IsInt()
    stock: number
    @IsOptional()
    @IsString()
    category?: string
    @IsNotEmpty()
    @IsBoolean()
    active: boolean
}