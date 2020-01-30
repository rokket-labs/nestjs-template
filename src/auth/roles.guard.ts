import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control'
import { IQueryInfo } from 'accesscontrol'

export interface Role {
  resource?: string
  action?: 'create' | 'read' | 'update' | 'delete'
  possession?: 'own' | 'any'
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) {}

  protected getUserRoles(context: ExecutionContext): string[] {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    const { user } = request
    if (!user) throw new UnauthorizedException()
    return user.roles
  }

  protected isOwner(context: ExecutionContext): boolean {
    return context && true
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler())
    if (!roles) return true
    const userRoles = this.getUserRoles(context)
    const hasRoles = roles.every(role => {
      const queryInfo: IQueryInfo = role
      queryInfo.role = userRoles
      const permission = this.roleBuilder.permission(queryInfo)
      return permission.granted
    })
    return hasRoles
  }
}
