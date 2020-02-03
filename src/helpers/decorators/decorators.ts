import { createParamDecorator } from '@nestjs/common'

/**
 * Access to current user.
 *
 * You can pass an optional property key to the decorator to get it from the user object
 * e.g `@UserRoles('premissions')` will return the `req.user.premissions` instead.
 */
export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
)
