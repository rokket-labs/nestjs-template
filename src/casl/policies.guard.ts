import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  Type,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'

import { Article } from 'src/articles/schemas/articles.model'

import {
  Action,
  AppAbility,
  CaslAbilityFactory,
  Subjects,
} from './casl-ability.factory'

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean
type PermissionList = [Action, Subjects][]

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback

export const CHECK_POLICIES_KEY = 'check_policy'

export const HasPermission = (permissions: PermissionList) => {
  const handlers = permissions.map((permission) => {
    return (ability: AppAbility) => ability.can(permission[0], permission[1])
  })

  return SetMetadata(CHECK_POLICIES_KEY, handlers)
}

export const CheckPolicies = (
  ...handlers: PolicyHandler[] | Type<PolicyHandler>[]
) => SetMetadata(CHECK_POLICIES_KEY, handlers)

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || []

    const ctx =
      context.getType<GqlContextType>() === 'graphql'
        ? GqlExecutionContext.create(context).getContext().req
        : context.switchToHttp().getRequest()

    const { user } = ctx
    const ability = this.caslAbilityFactory.createForUser(user)

    const article = new Article()

    article.user = user
    article.title = 'ASDASD'
    article.isPublished = true

    console.log(
      article,
      ability.can(Action.Update, article),
      ability.can(Action.Read, article),
    )

    return policyHandlers.every((handler) => {
      console.log(this.execPolicyHandler(handler, ability))

      return this.execPolicyHandler(handler, ability)
    })
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    return typeof handler === 'function'
      ? handler(ability)
      : handler.handle(ability)
  }
}
