import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET"),

        });
    }

    async validate(payload: {
        sub: string;
        displayName: string;
        email: string;
        // role: string;
    }) {
        console.log("jwt stategy:", payload)
        return {
            sub: payload.sub,
            displayName: payload.displayName,
            email: payload.email,
            // role: payload.role,
        };
    }
}