import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Token {
  accessToken: string
}
