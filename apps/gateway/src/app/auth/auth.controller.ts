import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { TCP_SERVICE } from "../constants.js";
import { UserLoginDto } from "../dto/userloginDto.js";
import { SingnupDto } from "../dto/sinupDto.js";

@Controller("auth")
export class AuthController {
    constructor(
        @Inject(TCP_SERVICE) private readonly tcpClinet: ClientProxy
    ) { }

    @Post("login")
    async login(@Body() userDataDto: UserLoginDto) {
        const token = await this.tcpClinet.send("auth.login", userDataDto)
        return token
    }


    @Post("signup")
    async signup(@Body() signupDataDto: SingnupDto) {
        return await this.tcpClinet.send("auth.signup", signupDataDto)
    }
}
