import { Body, Controller, Inject, Patch, Post, UseGuards } from '@nestjs/common';
import {  RMQ_SERVICE } from '../constants';
import {  ClientRMQ } from '@nestjs/microservices';
import { PRODUCT_PATTERNS } from '@orderly-platform/common';
import { UpdateProductDto as ClientUpdateProductDto } from '@orderly-platform/common';
import { CreateProductDto as ClientCreateProductDto } from '@orderly-platform/common';
import { PassportJwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role, Roles } from '../auth/metadata/roles';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('product')
@UseGuards(PassportJwtGuard, RolesGuard)
export class ProductController {
    constructor
    (@Inject(RMQ_SERVICE) private readonly rmqClient: ClientRMQ
) { }
    @ApiOperation({ description: "Creates a new product" })
    @ApiCreatedResponse({
        description: "Prodcut has been created!",
        type: ClientCreateProductDto
    })
    @ApiUnauthorizedResponse({ description: "Unathorized Acccess" })
    @ApiNotFoundResponse({ description: "User not found" })
    @ApiBadRequestResponse({ description: "Invalid input" })
    @Post()
    @Roles([Role.ADMIN, Role.MODERATOR])
    create(@Body() procutDto: ClientCreateProductDto) {
        this.rmqClient.emit(PRODUCT_PATTERNS.PRODUCT_CREATE, procutDto)
    }

    @Patch()
    @Roles([Role.ADMIN, Role.MODERATOR])
    update(@Body() UpdateProductDto: ClientUpdateProductDto) {
        this.rmqClient.emit(PRODUCT_PATTERNS.PRODUCT_UPDATE, UpdateProductDto)
    }
}
