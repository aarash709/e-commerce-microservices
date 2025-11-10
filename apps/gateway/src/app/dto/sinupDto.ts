import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SingnupDto {

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  displayName: string

  @IsString()
  password: string
}