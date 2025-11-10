import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @MessagePattern("auth.signup")
  async signup(@Payload() signupDataDto: { email: string, displayName: string, password: string }) {
    console.log("[AUTH SERVICE] new user", signupDataDto)
    return this.appService.signup(signupDataDto)
  }

  @MessagePattern("auth.login")
  async login(@Payload() data) {
    console.log("[AUTH_SERVICE] login", data)
    return this.appService.login(data)
  }

}
