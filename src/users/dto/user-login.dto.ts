import { InputType, Field, ID } from 'type-graphql'

@InputType()
export class UserLogin {
  @Field()
  readonly email: string
  @Field()
  readonly password: string
}
