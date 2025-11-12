// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { AppRole } from '../common/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no exige roles, pasa
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    // Si no hay usuario o su rol no está permitido
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('No tienes permiso para acceder a esta ruta');
    }

    return true;
  }
}

