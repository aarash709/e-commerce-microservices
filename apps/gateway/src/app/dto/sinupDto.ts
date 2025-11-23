import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SingnupDto {
  @ApiProperty({ description: "Email", example: "Randi.Boyer@gmail.com" })
  @IsEmail()
  email: string

  @ApiProperty({ description: "Displayname", example: "Micheal Bartell" })
  @IsString()
  @IsNotEmpty()
  displayName: string

  @ApiProperty({ description: "Password", example: "Uc2bGB66j0iheU5" })
  @IsString()
  password: string
}