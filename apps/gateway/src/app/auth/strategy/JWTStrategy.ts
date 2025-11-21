import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,

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