import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  applyDecorators,
  UseGuards,
  SetMetadata,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql'
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control'
import { IQueryInfo } from 'accesscontrol'
import { GqlAuthGuard } from './grapqhl-auth.guard'
import {
  CAN_DO_ANY_SYMBOL,
  WANT_TO_KNOW_IF_CAN_DO_ANY,
  ROLES_SYMBOL,
} from 'src/helpers/constants'

export interface Role {
  resource?: string
  action?: 'create' | 'read' | 'update' | 'delete'
  possession?: 'own' | 'any'
}

export const UseRoles = (...roles: Role[]): MethodDecorator =>
  SetMetadata(ROLES_SYMBOL, roles)

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) {}
  private ctx: GraphQLExecutionContext

  private createGQLContext(context: ExecutionContext): void {
    this.ctx = GqlExecutionContext.create(context)
  }

  private getReturnType(): string {
    return `${this.ctx.getInfo().returnType}`
  }

  private getUserRoles(): string[] {
    const { ctx } = this
    const request = ctx.getContext().req
    const { user } = request
    if (!user) throw new UnauthorizedException()
    return user.roles
  }

  private getRoles(reflectorRoles: Role[]): Role[] {
    const resource = this.getReturnType().replace(/[^a-zA-Z ]/g, '')
    return reflectorRoles.map(role => ({
      ...role,
      resource: role.resource || resource,
      possession: role.possession || 'own',
    }))
  }

  canActivate(context: ExecutionContext): boolean {
    this.createGQLContext(context)
    const handler = context.getHandler()
    const reflectorRoles = this.reflector.get<Role[]>(ROLES_SYMBOL, handler)
    const wantToKnowIfCanDoAny = this.reflector.get<boolean>(
      WANT_TO_KNOW_IF_CAN_DO_ANY,
      handler,
    )
    if (!reflectorRoles) return true

    const roles = this.getRoles(reflectorRoles)
    const userRoles = this.getUserRoles()
    const hasRoles = roles.every(role => {
      const queryInfo: IQueryInfo = { ...role, role: userRoles }
      const permission = this.roleBuilder.permission(queryInfo)
      return permission.granted
    })

    if (wantToKnowIfCanDoAny) {
      const canDoAny = roles.every(role => {
        const queryInfo: IQueryInfo = {
          ...role,
          possession: 'any',
          role: userRoles,
        }
        const permission = this.roleBuilder.permission(queryInfo)
        return permission.granted
      })
      Reflect.defineMetadata(CAN_DO_ANY_SYMBOL, canDoAny, handler)
    }
    return hasRoles
  }
}

/**
 * RoleGuard: check if your current user has enough permissions to perform the desired action in this resource
 * by default the resource is equal to the return type of the mutation and possession is 'own'
 * @example  @RoleProtected({ action: 'update' }) in a resolver of Order is equal to @RoleProtected({ action: 'update', resource: 'Order', possession: 'own'})
 *
 */
export function RoleProtected(roles: Role): MethodDecorator {
  return applyDecorators(UseRoles(roles), UseGuards(GqlAuthGuard, RolesGuard))
}
