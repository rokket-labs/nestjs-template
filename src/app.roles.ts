import { RolesBuilder } from 'nestjs-role-protected';

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

const rolesPermissions = {
  [Roles.ADMIN]: {
    Order: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    Item: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  [Roles.USER]: {
    Order: {
      'create:own': ['*'],
      'read:own': ['*'],
      'delete:own': ['*'],
      'update:own': ['*'],
    },
  },
};

export const roles = new RolesBuilder(rolesPermissions);
