

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role, Roles_Key } from '../metadata/roles';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const { user } = context.switchToHttp().getRequest();
        const requredRole = this.reflector.getAllAndOverride<Role[]>(
            Roles_Key,
            [context.getHandler(),
            context.getClass()])
            
        if (!requredRole) return true

        return requredRole.some((role) => user.role.includes(role));
    }
}
