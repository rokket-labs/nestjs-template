import { createParamDecorator } from '@nestjs/common'

/**
 * Access the user roles from the request object i.e `req.user.roles`.
 *
 * You can pass an optional property key to the decorator to get it from the user object
 * e.g `@UserRoles('premissions')` will return the `req.user.premissions` instead.
 */
export const UserRoles = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    console.log(data)
    return ctx.req.user?.roles
  },
)

export const UserId = createParamDecorator((data, [root, args, ctx, info]) => {
  // console.log(data, root, args, ctx, info)
  return ctx.req.user.id
})
