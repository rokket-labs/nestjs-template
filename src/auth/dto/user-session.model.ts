import { ObjectType } from '@nestjs/graphql'

import { User } from '../../users/schemas/users.model'

@ObjectType()
export class UserSession {
  idToken: string
  refreshToken: string
  accessToken: string
}

export type UserPayload = {
  userId: string
  user: User
}

export type Payload = {
  user: UserPayload
}
