import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [Role, ...Role[]]) =>
  SetMetadata(ROLES_KEY, roles);
