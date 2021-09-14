import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserSession {
  idToken: string
  refreshToken: string
  accessToken: string
}
