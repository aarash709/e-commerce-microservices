import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsDecimal, IsInt, IsBoolean } from "class-validator"

export class CreateProductDto {
    @ApiProperty({ description: "Name/Title of the product", example: "Milk" })
    @IsNotEmpty()
    @IsString()
    name!: string
    @ApiProperty({ description: "SKU of the product", example: "sku-10" })
    @IsNotEmpty()
    @IsString()
    sku!: string
    @ApiProperty({ description: "Description of the product", example: "Fresh high fat milk" })
    @IsOptional()
    @IsString()
    description?: string
    @ApiProperty({ description: "Price of the product", example: "100" })
    @IsNotEmpty()
    @IsDecimal()
    price!: string
    @ApiProperty({ description: "Current stock of the product", example: 12 })
    @IsNotEmpty()
    @IsInt()
    stock!: number
    @ApiProperty({ description: "Category of the product", example: "Default" })
    @IsOptional()
    @IsString()
    category?: string
    @ApiProperty({ description: "Is procuct currently for sale?", example: true })
    @IsNotEmpty()
    @IsBoolean()
    active!: boolean
}