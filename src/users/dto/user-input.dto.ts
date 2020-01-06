import { InputType, Field, ID } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  readonly email: string
  @Field()
  readonly password: string
  @Field()
  readonly firstName?: string
  @Field()
  readonly lastName?: string
}
