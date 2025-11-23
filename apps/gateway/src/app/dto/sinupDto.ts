import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SingnupDto {
  @ApiProperty({ description: "Email", example: "name@test.com" })
  @IsEmail()
  email: string

  @ApiProperty({ description: "Displayname", example: "John Smith" })
  @IsString()
  @IsNotEmpty()
  displayName: string

  @ApiProperty({ description: "Password", example: "123456789" })
  @IsString()
  password: string
}