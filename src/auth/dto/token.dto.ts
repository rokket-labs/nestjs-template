import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class TokenDto {
  @Field()
  readonly accessToken: string
}
