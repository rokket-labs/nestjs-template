import { InputType, Field } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  readonly email: string
  @Field()
  readonly password: string
  @Field({ nullable: true })
  readonly firstName: string
  @Field({ nullable: true })
  readonly lastName: string
}
