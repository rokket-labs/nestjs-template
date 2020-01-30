import { RolesBuilder } from 'nest-access-control'

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

const rolesPermissions = {
  [Roles.ADMIN]: {
    order: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  [Roles.USER]: {
    order: {
      'create:own': ['*'],
      'read:own': ['*'],
      'delete:own': ['*'],
    },
  },
}

export const roles = new RolesBuilder(rolesPermissions)
