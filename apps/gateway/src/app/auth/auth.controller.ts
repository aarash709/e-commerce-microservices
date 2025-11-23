import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { TCP_SERVICE } from "../constants.js";
import { UserLoginDto } from "../dto/userloginDto.js";
import { SingnupDto } from "../dto/sinupDto.js";
import { AUTH_PATTERNS } from "@orderly-platform/common";
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiTooManyRequestsResponse } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";

@Controller("auth")
export class AuthController {
    constructor(
        @Inject(TCP_SERVICE) private readonly tcpClinet: ClientProxy
    ) { }

    @ApiOperation({ description: "Returns the jwt token" })
    @ApiOkResponse({ description: "Login successful!", type: UserLoginDto })
    @ApiBadRequestResponse({ description: "Invalid input!" })
    @ApiTooManyRequestsResponse({ description: "Rate limited!, try again later." })
    @Post("login")
    async login(@Body() userDataDto: UserLoginDto, @Res({ passthrough: true }) res) {
        const token = await firstValueFrom(this.tcpClinet.send(AUTH_PATTERNS.AUTH_LOGIN, userDataDto))
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(new Date().getTime() + 24 * 7 * 60 * 60 * 1000),
        });
        return token
    }

    @ApiOperation({ description: "Signup and Returns the jwt token" })
    @ApiOkResponse({ description: "Signup successful!", type: SingnupDto })
    @ApiBadRequestResponse({ description: "Invalid input!" })
    @ApiTooManyRequestsResponse({ description: "Rate limited!, try again later." })
    @Post("signup")
    async signup(@Body() signupDataDto: SingnupDto, @Res({ passthrough: true }) res) {
        const token = await firstValueFrom(this.tcpClinet.send(AUTH_PATTERNS.AUTH_SIGNUP, signupDataDto))
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(new Date().getTime() + 24 * 7 * 60 * 60 * 1000),
        });
        return token
    }
}
