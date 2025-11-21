import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_PATTERNS } from "@orderly-platform/common";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @MessagePattern(AUTH_PATTERNS.AUTH_SIGNUP)
  async signup(@Payload() signupDataDto: { email: string, displayName: string, password: string }) {
    console.log("[AUTH SERVICE] new user", signupDataDto)

    return this.appService.signup(signupDataDto)
  }

  @MessagePattern(AUTH_PATTERNS.AUTH_LOGIN)
  async login(@Payload() data: { email: string, password: string }) {
    console.log("[AUTH_SERVICE] login", data)
    const result = this.appService.login(data)
    return result
  }

}
