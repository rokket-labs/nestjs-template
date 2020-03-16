import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokenDto {
  accessToken: string
}
