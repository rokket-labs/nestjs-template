import { SetMetadata } from '@nestjs/common'

export const Roles = (
  ...roles: string[]
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
((target: object, key?: any, descriptor?: any) => any) =>
  SetMetadata('roles', roles)
