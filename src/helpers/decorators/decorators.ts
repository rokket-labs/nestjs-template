import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * Access to current user.
 *
 * You can pass an optional property key to the decorator to get it from the user object
 * e.g `@UserRoles('premissions')` will return the `req.user.premissions` instead.
 */
export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user,
)
