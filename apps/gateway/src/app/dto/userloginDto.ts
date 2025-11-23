import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
    @ApiProperty({description:"Email",example:"name@test.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string
    @ApiProperty({description:"Password",example:"12345789"})
    @IsNotEmpty()
    @IsString()
    password: string
}