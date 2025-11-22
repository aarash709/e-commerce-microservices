import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.provider';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export enum Role {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  CUSTOMER = "CUSTOMER"
}
@Injectable()
export class AppService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtservice: JwtService) { }

  async signup(data: { email: string, displayName: string, password: string, role: Role, }) {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const createdUser = await this.database.user.create({
      data: {
        ...data,
        password: hashedPassword,
      }
    })
    return this.generateJWT({
      sub: createdUser.id.toString(),
      displayName: createdUser.displayName,
      email: createdUser.email,
      role: createdUser.role
    })

  }

  async login(data: { email: string; password: string; }) {
    const user = await this.database.user.findFirst({ where: { email: data.email } })
    const hashedPassword = user.password
    const comprePass = bcrypt.compare(data.password, hashedPassword)
    if (!user || !comprePass) {
      throw new UnauthorizedException("Invalid credentials!");
    }
    return this.generateJWT({
      sub: user.id.toString(),
      displayName: user.displayName,
      email: user.email,
      role: user.role
    })
  }

  async generateJWT(user: { sub: string, displayName: string, email: string, role: string }) {
    const token = await this.jwtservice.signAsync(user)
    return { access_token: token }
  }
}
