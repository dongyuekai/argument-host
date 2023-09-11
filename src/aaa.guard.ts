import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from './role';

// guard就是守卫的意思
@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // ['admin']
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    // 这样在 Guard 里就可以根据这个 metadata 决定是否放行了
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest(); // undefined
    return requiredRoles.some((role) => user && user.roles?.includes(role));
  }
}
