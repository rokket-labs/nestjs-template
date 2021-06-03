import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

/**
 * Access to current user.
 *
 * You can pass an optional property key to the decorator to get it from the user object
 * e.g `@UserRoles('premissions')` will return the `req.user.premissions` instead.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)

    return ctx.getContext().req.user
  },
)
