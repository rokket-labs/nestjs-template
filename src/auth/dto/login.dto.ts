import { InputType, Field, ID } from 'type-graphql'

@InputType()
export class Login {
  @Field()
  readonly email: string
  @Field()
  readonly password: string
}
