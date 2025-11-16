import { CreateProductDto } from "./createProductDto"
import { PartialType } from '@nestjs/mapped-types'

export class UpdateProductDto extends PartialType(CreateProductDto) { }