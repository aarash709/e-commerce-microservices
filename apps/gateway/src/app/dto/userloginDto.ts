import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
    @ApiProperty({description:"Email",example:"Randi.Boyer@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string
    @ApiProperty({description:"Password",example:"Uc2bGB66j0iheU5"})
    @IsNotEmpty()
    @IsString()
    password: string
}