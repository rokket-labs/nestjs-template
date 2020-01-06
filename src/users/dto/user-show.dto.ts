import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class UserShow {
  @Field(() => ID)
  readonly id: number
  @Field()
  readonly email: string
  @Field()
  readonly firstName?: string
  @Field()
  readonly lastName?: string
}
