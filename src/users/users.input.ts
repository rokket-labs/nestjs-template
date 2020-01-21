import { InputType, Field } from 'type-graphql'

@InputType()
export class UserInput {
  @Field(() => String)
  readonly email!: string

  @Field(() => String)
  readonly password!: string

  @Field({ nullable: true })
  readonly firstName?: string

  @Field({ nullable: true })
  readonly lastName?: string
}
