// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { AppRole } from '../common/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
