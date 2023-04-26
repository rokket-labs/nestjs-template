import { ObjectType } from '@nestjs/graphql'

import { User } from 'src/users/schemas/users.model'

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
