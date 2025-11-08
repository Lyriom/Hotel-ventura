import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];

    // Si el endpoint no tiene @Roles, no restringimos
    if (requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // lo rellena AuthGuard('jwt')

    // Debug opcional:
    // console.log('RolesGuard - required:', requiredRoles, 'user:', user);

    if (!user) {
      throw new ForbiddenException('No autenticado');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('No tienes permisos para acceder');
    }

    return true;
  }
}
